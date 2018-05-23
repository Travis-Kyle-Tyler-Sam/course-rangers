

module.exports = {
    newCurriculum: async (req, res) => {
    try {

        let { name, days } = req.body
        let db = req.app.get('db')
        //======================================================================================//
        //==================== Change this back to req.user ====================================//
        //===================================================================V==================//
        let curriculum 
        
        if(req.params.id) {
            curriculum = await db.curricula_DB.update_curriculum( [req.params.id, name, 1] )
            .catch( err => console.log(err))

        } else {
            curriculum = await db.curricula_DB.create_new_curriculum( [name, 1] )
            .catch( err => console.log(err))
        }

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

                let totPoints = questions.reduce( (total, current) => {
                    return total + current.ptsPossible
                }, 0)

                let quizId = await db.assignments_DB.create_assignment( [title, description, dueDate, 'quiz', null, dayId, curriculumId, totPoints] )
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

    prepDelete: async (req, res, next) => {
        await req.app.get('db').curricula_DB.delete_curriculum( [req.params.id] )

        next();
    },

    getCurricula: async (req, res) => {
        let db = req.app.get('db')
        // =========== CHANGE THIS TO REQ.USER ===========//
        let curricula = db.curricula_DB.get_curricula( );
        let days = db.days_DB.get_days();
        let quizzes = db.assignments_DB.get_quizzes();
        let assignments = db.assignments_DB.get_assignments();
        let resources = db.resources_DB.get_day_resources()
        let questions = db.questions_DB.get_quiz_questions();
        let options = db.options_DB.get_question_options();

        let data = await Promise.all( [curricula, days, quizzes, resources, assignments, questions, options] )

        let [ cur, curDays, qui, reso, assign, ques, opt ] = data

        cur.forEach( (curriculum, i, arr) => {
            arr[i].days = curDays.filter( day => day.curriculum_id === curriculum.id )

            arr[i].days.forEach( (day, i, arr) => {
                arr[i].assignments = assign.filter( assignment => assignment.curriculum_day_id === day.id)
                arr[i].resources = reso.filter( resource => resource.curriculum_day_id === day.id)
                arr[i].quizzes = qui.filter( quiz => quiz.curriculum_day_id === day.id)
                arr[i].quizzes.forEach( (quiz, j, quizArr) => {
                    let qs = ques.filter( q => q.assignment_id === quiz.id)
                    quizArr[j].questions = qs
                    quizArr[j].questions.forEach( (question, k, quesArr) => {
                        quesArr[k].options = opt.filter( option => question.id === option.question_id)
                    })
                })
            })
        })

        return res.status(200).send(cur)
    },

    deleteCurriculum: (req, res)=>{
        req.app
          .get('db')
          .curricula_DB.delete_curriculum([req.params.id])
          .then(response => {
            res.status(200).send(response);
          })
          .catch(err => console.log(err));
      }
}