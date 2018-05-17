const moment = require('moment')

module.exports = {
    addCourse: async (req, res) => {
        //======================================================================================//
        //==================== Change this back to req.user ====================================//
        /*===========================*/ let id = 1 /*===========================================*/
        //======================================================================================//
        let { name, days, startDate, id: curId, enrolledStudents: students } = req.body
        let completionDate = days[day.length -1].date
        
        let db = await req.app.get('db')

        let course = await db.courses_DB.create_course( [name, id, startDate, completionDate, curId] )
        await add_course_student( [id, course.id] )

        for( let i=0; i<students.length; i++ ) {
            let stud = students[i]
            await db.add_course_student( [stud.id, course.id])
        }

        for( let i=0; i<days.length; i++){
            let day = days[i]
            let courseDay = await db.add_course_day( [day.date, day.topic, day.description, day.day_in_curriculum] )

            let courseDayId = courseDay[0].id

            for( let j=0; j<day.assignments.length; j++) {

                let { id: aId, assignment_name: aName, explanation: desc, type, total_pts: tPts } = assignments[j]
                let dueDate = moment(startDate).add(assignments[j].due_date_offset, 'd').format('YYYY-MM-DD') 
                for( let k=0; k<students.length; k++) {
                    let sId = students[i].id
                    let cId = course.id
                    await db.course_assignments_DB.add_course_assignment( [sId, cId, aId, tPts, courseDayId, dueDate, aName, desc, 'assignment'])
                }
            }

            for( let l=0; l<day.quizzes.length; l++) {

                assignment_name:"myquiz"
                attachment:null
                curriculum_day_id:9
                curriculum_id:26
                due_date_offset:3
                explanation:"two question"
                id:8
                questions:Array(2) [Object, Object]
                total_pts:null
                type:"quiz"

                let { id: qId, assignment_name: qName, explanation: desc, type, total_pts: tPts, questions } = quizzes[l]
                let dueDate = moment(startDate).add(quizzes[l].due_date_offset, 'd').format('YYYY-MM-DD')

                for( let k=0; k<students.length; k++) {
                    let sId = students[i].id
                    let cId = course.id
                    let quiz = await db.course_assignments_DB.add_course_assignment( [sId, cId, qId, null, courseDayId, dueDate, qName, desc, 'quiz'])

                    // START HERE -- ITERATE AND INSERT QUESTIONS FROM QUIZ

                }
            }
        }



    },

    deleteCourse: (req, res)=>{
        req.app
          .get('db')
          .courses_DB.delete_course([req.params.id])
          .then(response => {
            res.status(200).send(response);
          })
          .catch(err => console.log(err));
    },

    getCourses: (req, res) => {
        req.app
        .get('db')
        .courses_DB.get_teachers_courses([req.user])
        .then(response => res.status(200).send(response))
        .catch(err=> console.log(err));
    }

   
}