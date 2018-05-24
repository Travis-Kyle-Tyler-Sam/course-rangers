const filter = require('lodash/filter');
const map = require('lodash/map')

module.exports = {
    getUser: (req, res, next ) => {

    },
    getCourses: async (req, res, next) =>{
        const {studentid} = req.params;
        req.session.studentid = studentid
        let results = await req.app.get('db')
        .course_students_DB
        .get_course_students([studentid])
        if (results.length === 0){
            results = [{course_name:'No courses yet!'}]
        }
        req.session.userCourses = results
        next()

    },

    getQuiz: async (req, res) => {
        let db = req.app.get('db')
        let quizId = 111
        let quiz = await db.course_assignments_DB.get_student_quiz( [req.params.quizid] )
        quiz = quiz[0];
        let questions = await db.course_assignments_DB.get_student_questions( [quiz.id] )

        
        for(let i=0; i<questions.length; i++) {
            let options = await db.course_assignments_DB.get_student_options( [questions[i].question_id] )
            questions[i].options = options
        }

        quiz.questions = questions

        return res.status(200).send(quiz)
    },

    updateQuiz: async (req, res, next) => {
        let id = req.params.quizid
        let { ptsScored, percent, date, letterGrade } = req.body
        await req.app.get('db').course_assignments_DB.update_course_quiz( [ptsScored, percent, date, letterGrade, id] )
        return res.sendStatus(200)
    },

    getAssignments: async (req, res, next) => {
        const {studentid} = req.params;
        let results = await req.app.get('db')
        .course_students_DB
        .get_all_assignments([studentid])

        req.session.userAssignments = results
        res.status(200).send({courses:req.session.userCourses, assignments:results})
    },
    getCourseDetail: async (req, res, next) => {
        const { courseid } = req.params;

        let result = await req.app.get('db')
        .courses_DB
        .get_course([courseid])
        if (result.length === 0){
            result = [{course_name:'No courses yet!'}]
        }
        req.course = result;
        next()
    },
    getCourseDays: async (req, res, next) => {
        const { courseid } = req.params;

        let result = await req.app.get('db')
        .course_students_DB
        .get_course_days([courseid])
        req.days = result
        next()

    },
    getCourseAssignments: async (req, res, next) => {
        const { courseid }= req.params;
        
        let result = await req.app.get('db')
        .course_students_DB
        .get_course_assignments([courseid, req.session.studentid])
        req.courseassignments = result
        next()
    },
    getCourseResources: async (req, res, next) => {
        const { courseid } = req.params;
        let result = await req.app.get('db')
        .course_students_DB
        .get_day_resources([courseid])
        res.status(200).send({course:req.course, daysArray:req.days, assignments:req.courseassignments, resources:result})

    },
    uploadFile: async (req, res, next) => {
        const { url, assignmentID, studentID, dateSubmitted } = req.body;
        req.params.studentid = studentID;
        let result = await req.app.get('db')
        .course_students_DB
        .add_file_url([url, assignmentID, dateSubmitted])
        next()

    },
    courseUploadFile: async (req, res, next) => {
        const { url, assignmentID, courseid, dateSubmitted } = req.body;
        req.params.courseid = courseid;
        let result = await req.app.get('db')
        .course_students_DB
        .add_file_url([url, assignmentID, dateSubmitted])
        next()
    }

}