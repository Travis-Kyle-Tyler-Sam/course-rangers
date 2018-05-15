

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

        let currArr = curricula.map( curr => {
            return {
                id: curr.id,
                name: curr.curriculum_name,
                teacherId: curr.teacher_id,
                curriculumDays: []
            }
        })

        let getCurriculumDays = new Promise(function(resolve, reject){
            currArr.forEach( async (curriculum, i, arr)=>{
                currArr[i].curriculumDays = await db.days_DB.get_days( [curriculum.id] ) //curr.id
                if( i === currArr.length-1) resolve()
            })
        })
        await getCurriculumDays
          
            let getAssignments = new Promise(function(resolve, reject){
                // for(let i in currArr; i)
                currArr.forEach( (curr, i)=>{

                    currArr[i].curriculumDays.forEach(async (day, j, arry)=>{
                        arry[j].assignments = await db.assignments_DB.get_day_assignments([day.id])

                        arry[j].quizzes = await db.assignments_DB.get_day_quizzes([day.id])

                        arry[j].resources = await db.resources_DB.get_day_resources([day.id])

                        if(arry[j].quizzes.length > 0 ){
                            for( let quiz of arry[j].quizzes) {
                                quiz.questions = await db.questions_DB.get_quiz_questions([quiz.id])
                                
                                for( let question of quiz.questions ){
                                    question.options = await db.options_DB.get_question_options([question.id])
                                }
                            }
                        }
                        if (i === currArr.length-1 && j === arry.length-1) resolve();
                    })
                    })
                // currArr.forEach( (curr, i)=>{

                //     currArr[i].curriculumDays.forEach(async (day, j, arry)=>{
                //         arry[j].assignments = await db.assignments_DB.get_day_assignments([day.id])

                //         arry[j].quizzes = await db.assignments_DB.get_day_quizzes([day.id])

                //         arry[j].resources = await db.resources_DB.get_day_resources([day.id])

                //         if(arry[j].quizzes.length > 0 ){
                //             for( let quiz of arry[j].quizzes) {
                //                 quiz.questions = await db.questions_DB.get_quiz_questions([quiz.id])
                                
                //                 for( let question of quiz.questions ){
                //                     question.options = await db.options_DB.get_question_options([question.id])
                //                 }
                //             }
                //         }
                //         if (i === currArr.length-1 && j === arry.length-1) resolve();
                //     })
                //     })
            })
            
            await getAssignments.catch(err=>console.log(err))

            let testObj = {
                data: currArr,
                assign: getAssignments,

            }

            return res.status(200).send(currArr)
   
    }
}