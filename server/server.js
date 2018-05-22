require("dotenv").config();

const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  curriculumctrl = require("./curriculumctrl")
  adminctrl = require('./adminctrl'),
  coursectrl = require('./coursectrl'),
  studentctrl = require('./studentctrl'),
  socketctrl = require('./socketctrl'),
  socketIo = require('socket.io'),
  http = require('http'),
  assignmentctrl = require('./assignmentctrl')
  S3 = require("./s3");
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT,
    REDIRECT_URL,
    LOGOUT_SUCCESS
  } = process.env;
  


const app = express();
const server = http.createServer(app)
const io = socketIo(server, {wsEngine:'ws'});
app.use(bodyParser.json({ limit: "50MB" }));
S3(app);



massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Connection Established");
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile email"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      db.users_DB.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
          db.
            users_DB.create_user([profile.displayName, profile.id, profile.emails[0].value, null, null, null, null, 0, 0 ])
            .then(createdUser => {
              return done(null, createdUser[0].id)
            })
            .catch(err => console.log(err));
        } else {
          return done(null, userResult[0].id);
        }
      });
    }
  )
);

passport.serializeUser((id, done) => {
  done(null, id);
});
passport.deserializeUser((id, done) => {
  app
    .get("db")
    .users_DB.find_session_user([id])
    .then(loggedInUser => {
      done(null, loggedInUser[0]);
    })
    .catch(err => console.log(err));
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
  })
);

app.get("/auth/me", function(req, res) {
  if (!req.user) {
    res.sendStatus(401);
  } else {
    res.status(200).send(req.user);
  }
});


///s3 uploader
app.get("/api/get_uploads", (req, res) => {
  app
    .get("db")
    .uploads_DB.get_users_uploads([req.session.passport.user])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
});

app.post("/api/add_uploads", (req, res) => {
  app
    .get("db")
    .uploads_DB.create_upload([req.body.img, req.session.passport.user])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
});



app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect(process.env.LOGOUT_SUCCESS);
});

server.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));



///////   curricula endpoints //////

app.delete('/api/curriculum/:id', curriculumctrl.deleteCurriculum)

app.put('/api/curriculum/:id', curriculumctrl.prepDelete, curriculumctrl.newCurriculum)

app.post('/api/curriculum/', curriculumctrl.newCurriculum)

app.get('/api/curriculum/', curriculumctrl.getCurricula)

//// courses endpoints /////

app.get('/api/teacher_courses/:teacher_id', coursectrl.getCourses)

app.get('/api/courses', coursectrl.getCourses)

app.post('/api/course', coursectrl.addCourse)

app.put('/api/course/:id', coursectrl.prepDelete, coursectrl.addCourse)

app.delete('/api/course/:id', coursectrl.deleteCourse)

//// admin endpoints ////

app.get('/api/registry/:adminid', adminctrl.getRegistry)
app.post('/api/registry/addUser', adminctrl.addUser)
app.put('/api/registry/editUser', adminctrl.editUser)
app.delete('/api/registry/deleteUser/:userid', adminctrl.deleteUser)


/// assignment endpoints ///
app.get('/api/courseassignments/:assignmentid', (req, res)=>{
  app
    .get('db')
    .course_assignments_DB.getassignments(req.params.assignmentid)
    .then(response =>{
      res.status(200).send(response)
    })
    .catch(err=>{console.log(err)})
})

app.get('/api/assignment/:assignmentid', assignmentctrl.getAssignment)

app.put('/api/gradeassignment/:studentAssignmentId', (req, res)=>{
  console.log(req.params, req.body)
  app
  .get('db')
  .course_assignments_DB.grade_assignment([req.body.assignmentId, req.body.pointsScored, req.body.percentage, req.body.letterGrade, req.params.studentAssignmentId, ])
  .then(response =>{
    res.status(200).send(response)
    .catch(err=>{console.log(err)})
  })
})

/// student dash etc. endpoints ///

app.get('/api/student/getcourse/:studentid', studentctrl.getCourses, studentctrl.getInstructors)
app.get('/api/student/quiz/:quizid', studentctrl.getQuiz)

/// student selector endpoints ////

app.get('/api/getAllStudents', (req, res) =>{
  app
    .get('db')
      .users_DB.get_all_students()
      .then(response =>{
        res.status(200).send(response);
      })
      .catch(err =>{console.log(err)})
})


io.on('connection', socket => {
  console.log('client logged on')
  
  socket.on('join', (roomName, cb) => {
    socket.join(roomName, () => {
      let rooms = Object.keys(socket.rooms)
      console.log(rooms)
      cb(roomName)
    })
  })

  
  socket.on('thumbs launched', (teacherinput, cb) => {
    socket.to(`Student${teacherinput[1]}`).emit('open thumbs', teacherinput[0])
    cb()
  })
  
  socket.on('students send thumbs', (thumbqualityArray, cb) => {
    socket.to(`Instructor${thumbqualityArray[1]}`).emit('thumbcount',thumbqualityArray[0])
    cb()
  })

  socket.on('student thumb response', (studentinput, cb) => {
    socket.to(`Instructor${studentinput[1]}`).emit('get student response', studentinput)
    cb()
  })

  socket.on('free response', (teacherinput, cb) => {
    socket.to(`Student${teacherinput[1]}`).emit('student free response', teacherinput[0])
    cb()
  })

  socket.on('student free response', (studentinput, cb) => {
    socket.to(`Instructor${studentinput[1]}`).emit('get free response', studentinput)
    cb()
  })
  
  socket.on('disconnect', (reason) => {
    console.log('user disconnected because ', reason)
  })

  socket.on('error', (err) => {
    console.log(err)
  })
});
