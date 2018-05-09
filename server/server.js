require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0");
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
    REDIRECT_URL
  } = process.env;



  const app = express();


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


/// need to rename db query functions
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
    res.redirect(process.env.REDIRECT_URL);
  });

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));