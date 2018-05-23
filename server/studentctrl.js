module.exports = {
    getCourses: async (req, res, next) =>{
        const {studentid} = req.params;
        
        let results = await req.app.get('db')
        .course_students_DB
        .get_course_students([studentid])
        
        req.userCourses = results
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

    getInstructors: async (req, res, next) => {
        let courses = [...req.userCourses]
        let courseReturn = [];
        let result
        let course
        let newCourse
        for (let i = 0; i<courses.length; i++){
            course = courses[i];
            
            result = await req.app.get('db')
            .course_students_DB
            .get_course_instructor([course.class_id])
            courseReturn.push(Object.assign({},course, result))
        }

        res.status(200).send(courseReturn)
    }
}