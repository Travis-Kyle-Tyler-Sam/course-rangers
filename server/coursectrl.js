module.exports = {
    addCourse: async (req, res) => {
        //======================================================================================//
        //==================== Change this back to req.user ====================================//
        /*===========================*/ let id = 1 /*===========================================*/
        //======================================================================================//
        // let { name, days, startDate, id: curId } = req.body
        // let completionDate = days[day.length -1].date
        
        // let db = await req.app.get('db')

        // let course = await db.courses_DB.create_course( [name, id, startDate, completionDate, curId] )

        // for( let i=0; i<days.length; i++){
        //     let day = days[i]
        //     let courseDay = await db.add_course_day( [day.date, day.topic, day.description, day.day_in_curriculum] )
        // }



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