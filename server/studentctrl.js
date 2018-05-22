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
        
        req.session.userCourses = results
        next()

    },
    // getInstructors: async (req, res, next) => {
    //     let courses = [...req.userCourses]
    //     let instructorReturn = [];
    //     let result
    //     let course
    //     for (let i = 0; i<courses.length; i++){
    //         course = courses[i];
            
    //         result = await req.app.get('db')
    //         .course_students_DB
    //         .get_course_instructor([course.class_id])
    //         instructorReturn.push(result)
            
    //     }
    //    req.userInstructors = instructorReturn
       
    //     next()
        
    // },
    getAssignments: async (req, res, next) => {
        // let courses = [...req.userCourses]
        // let assignmentReturn = [];
        // let result 
        // let course
        // for (let i =0; i<courses.length;i++){
        //     course = courses[i];

        //     result = await req.app.get('db')
        //     .course_students_DB
        //     .get_course_assignments([course.user_id])
        //     assignmentReturn.push(result)
        // }
        // req.userAssignments = assignmentReturn
        
        // next()
        const {studentid} = req.params;
        let results = await req.app.get('db')
        .course_students_DB
        .get_all_assignments([studentid])

        req.session.userAssignments = results
        res.status(200).send({courses:req.session.userCourses, assignments:results})
    },
    // organizeEverything: (req, res, next) => {
    //     let instructor
    //     let newCourses = map(userCourses, course => {
    //         instructor = req.userInstructors.filter( instructor => {
    //             return instructor.course_name === course.course_name
    //         })[0];
    //         return Object.assign({}, course, 
    //             {
    //                 instructorName:instructor.user_name,
    //                 instructorID: instructor.teacher_id
    //             }
    //         )
    //     })




    //     let everything = {
    //         assignments:req.userAssignments[0],
    //         courses:req.userCourses,
    //         instructors:req.userInstructors[0]
    //     }
        
    //     res.status(200).send(everything)
    // },
    getCourseDetail: async (req, res, next) => {
        const { courseid } = req.params;

        let result = await req.app.get('db')
        .courses_DB
        .get_course([courseid])
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
        console.log('studentid: ',req.session.studentid)
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