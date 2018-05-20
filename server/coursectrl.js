const moment = require('moment')

module.exports = {
    addCourse: async (req, res) => {
        //======================================================================================//
        //==================== Change this back to req.user ====================================//
        /*===========================*/ let id = 1 /*===========================================*/
        //======================================================================================//
        let { name, days, id: curId, enrolledStudents: students, selectedDays } = req.body
        let completionDate = days[days.length -1].date
        let startDate = days[0].date
        
        let db = await req.app.get('db')

        let course 
        
        if( req.params ) {
            course = await db.courses_DB.update_course( [req.params.id, name, id, startDate, completionDate, curId, selectedDays] )
        } else {
            course = await db.courses_DB.create_course( [name, id, startDate, completionDate, curId, selectedDays] )
        }
        
        course = course[0]
        
        let studCourse = await db.course_students_DB.add_course_student( [id, course.id] )

        for( let i=0; i<students.length; i++ ) {
            let stud = students[i]
            await db.course_students_DB.add_course_student( [stud.id, course.id] )
        }

        for( let i=0; i<days.length; i++){
            let day = days[i]
            let courseDay = await db.course_days_DB.add_course_day( [day.date, course.id, day.topic, day.description, day.day_in_curriculum] )
            

            let courseDayId = courseDay[0].id

            for( let j=0; j<day.assignments.length; j++) {

                let { id: aId, assignment_name: aName, explanation: desc, type, total_pts: tPts } = day.assignments[j]
                let dueDate = moment(startDate).add(day.assignments[j].due_date_offset, 'd').format('YYYY-MM-DD') 

                for( let k=0; k<students.length; k++) {
                    let sId = students[k].id
                    let cId = course.id
                    await db.course_assignments_DB.add_course_assignment( [sId, cId, aId, tPts, courseDayId, dueDate, aName, desc, 'assignment'])
                }
            }

            for( let l=0; l<day.quizzes.length; l++) {

                let { id: qId, assignment_name: qName, explanation: desc, type, total_pts: tPts, questions } = day.quizzes[l]
                let dueDate = moment(startDate).add(day.quizzes[l].due_date_offset, 'd').format('YYYY-MM-DD')

                for( let k=0; k<students.length; k++) {
                    let sId = students[k].id
                    let quiz = await db.course_assignments_DB.add_course_assignment( [sId, course.id, qId, null, courseDayId, dueDate, qName, desc, 'quiz'])

                    // START HERE -- ITERATE AND INSERT QUESTIONS FROM QUIZ
                    for( let m=0; m<questions.length; m++ ) {

                        let { correct_answer: cAnswer, points: pts, question: qText, id: qId } = questions[m]
                        await db.course_questions_DB.add_course_question( [quiz[0].id, qText, cAnswer, qId, pts ] )
                    }
                }
            }

            for( let n=0; n<day.resources.length; n++) {
                let resource = day.resources[n]
                let { description, title, url } = resource

                await db.course_resources_DB.add_course_resource( [title, description, url, courseDayId] )
            }
        }

        return res.sendStatus(200)
    },

    prepDelete: async (req, res, next) => {
        await req.app.get('db').courses_DB.delete_course( [req.params.id] )
        next();
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

    getCourses: async (req, res) => {
        //======================================================================================//
        //==================== Change this back to req.user ====================================//
        /*===========================*/ let id = 1 /*===========================================*/
        //======================================================================================//

    //    let db = req.app.get('db')

       
    //    return res.status(200).send(courses)
       
       
       
        let db = req.app.get('db')
        // =========== CHANGE THIS TO REQ.USER ===========//
        let courses = db.courses_DB.get_courses( [id] )
        let courseDays = db.course_days_DB.get_course_days();
        let courseQuizzes = db.course_assignments_DB.get_course_quizzes();
        let courseAssignments = db.course_assignments_DB.get_course_assignments();
        let courseResources = db.course_resources_DB.get_course_resources()
        let courseQuestions = db.course_questions_DB.get_course_questions();
        let options = db.options_DB.get_question_options();
        let courseStudents = db.courses_DB.get_course_students()

        let data = await Promise.all( [courses, courseDays, courseQuizzes, courseResources, courseAssignments, courseQuestions, options, courseStudents] )

        let [ cou, couDays, couQui, couReso, couAssign, couQues, couOpt, couStudents ] = data

        cou.forEach( (course, i, arr) => {
            arr[i].days = couDays.filter( day => day.course_id === course.id )

            arr[i].days.forEach( (day, i, arr) => {
                arr[i].assignments = couAssign.filter( assignment => assignment.course_day_id === day.id)
                arr[i].resources = couReso.filter( resource => resource.course_day_id === day.id)
                arr[i].quizzes = couQui.filter( quiz => quiz.course_day_id === day.id)
                arr[i].quizzes.forEach( (quiz, j, quizArr) => {
                    quizArr[j].questions = couQues.filter( q => q.course_assignments_id === quiz.id)
                    quizArr[j].questions.forEach( (question, k, quesArr) => {
                        quesArr[k].options = couOpt.filter( option => question.question_id === option.question_id)
                    })
                })
               
            })

            arr[i].students = couStudents.filter( student => student.class_id === course.id)
        })

        return res.status(200).send(cou)
       
    }

   
}