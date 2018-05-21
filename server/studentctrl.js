module.exports = {
    getCourses: async (req, res, next) =>{
        const {studentid} = req.params;
        
        let results = await req.app.get('db')
        .course_students_DB
        .get_course_students([studentid])
        
        req.userCourses = results
        next()

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