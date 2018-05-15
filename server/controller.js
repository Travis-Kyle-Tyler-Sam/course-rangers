

module.exports = {
    newCurriculum: async (req, res) => {
    try {

        let { name, days } = req.body
        let db = req.app.get('db')
        //======================================================================================//
        //==================== Change this back to req.user ====================================//
        //===================================================================V==================//
        let curriculum = await db.curricula_DB.create_new_curriculum( [name, 1] )
        .catch( err => console.log(err))

        let curriculumId =  curriculum[0].id

        days.forEach( async indDay => {
            let { dayTopic, dayDesc, dayNum, assignments, quizzes, resources } = indDay
            let dayId = await db.days_DB.create_day( [curriculumId, dayTopic, dayDesc, dayNum] )
            .catch( err => console.log(err))

            dayId = dayId[0].id
            
            assignments.forEach( async assignment => {
                let { description, dueOffset, title, totalPts, url } = assignment
                if(url = '') url = null;
                await db.assignments_DB.create_assignment([title, description, dueOffset, 'assignment', url, dayId, curriculumId, totalPts])
                .catch( err => console.log(err))
            })

            resources.forEach( async resource => {
                let { description, title, type, url } = resource
                await db.resources_DB.create_resource( [title, description, url, dayId] )
            })

            quizzes.forEach( async quiz =>{
                let { description, dueDate, title, questions } = quiz
                let quizId = await db.assignments_DB.create_assignment( [title, description, dueDate, 'quiz', null, dayId, curriculumId, null] )
                .catch( err => console.log(err))

                quizId = quizId[0].id

                questions.forEach( async q => {
                    let { answerOptions, correctAnswer, ptsPossible, questionText } = q
                    let qId = await db.questions_DB.create_question( [quizId, questionText, correctAnswer, ptsPossible] )
                    .catch( err => console.log(err))

                    qId = qId[0].id

                    answerOptions.forEach( async option => {
                        await db.options_DB.create_option( [ option, qId ] )
                        .catch( err => console.log(err))
                    })
                })
            })
        })
            return res.sendStatus(200)
        } catch(err) {
            console.log(err)
        } 
    },

    getCurricula: async (req, res) => {

        let db = req.app.get('db')
        // =========== CHANGE THIS TO REQ.USER ===========//
        let curricula = await db.curricula_DB.get_teachers_curricula([1])
        allCurricula = await curricula.map( async curr => {

            let days = await db.days_DB.get_days( [curr.id] )
            let myDays = days.map( async day => {

                let assignments = await db.assignments_DB.get_day_assignments([day.id])

                let resources = await db.resources_DB.get_day_resources([day.id])

                let quizzes = await db.assignments_DB.get_day_quizzes([day.id])

                quizzes = await quizzes.map( async quiz =>{

                    let questions = await db.questions_DB.get_quiz_questions([quiz.id])

                    questions = await questions.map( async q => {
                        let options = await db.options_DB.get_question_options([q.id])

                        return {
                            id: q.id,
                            question: q.question,
                            correctAnswer: q.correct_answer,
                            ptsPossible: q.points,
                            answerOptions: options
                        }
                    })

                    return {
                        quizName: quiz.assignment_name,
                        quizDesc: quiz.explanation,
                        dueDate: quiz.due_date_offset,
                        quizQuestions: questions
                    }
                })

                return {
                    dayId: day.id,
                    dayTopic: day.topic,
                    dayDesc: day.description,
                    dayNum: day.day_in_curriculum,
                    assignments: assignments,
                    resources: resources,
                    quizzes: quizzes
                }
            })

            return {
                id: curr.id,
                name: curr.curriculum_name,
                days: myDays
            }

        })
    allCurricula[0].then(response => console.log(response))
    }
}