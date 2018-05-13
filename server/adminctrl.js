module.exports = {
    getRegistry: (req, res, next) => {
        let { adminid } = req.params;
        req.app.get('db')
        .users_DB.get_admin_people([adminid])
        .then( response => {
            let responseStudents = response.filter( user => {
                return user.user_type === 'Student'
            });
            let students = responseStudents.map( student => {
                return Object.assign({},{
                    name:student.user_name,
                    email:student.email,
                    phone:student.phone,
                    userType:student.user_type,
                    id:student.id
                });
            });
            let responseInstructors = response.filter( user => {
                return user.user_type === 'Instructor'
            });
            let instructors = responseInstructors.map( instructor => {
                return Object.assign({}, {
                    name:instructor.user_name,
                    email:instructor.email,
                    phone:instructor.phone,
                    userType:instructor.user_type,
                    id:instructor.id
                });
            });
            res.status(200).send({students,instructors})
        })
        .catch(err => console.log(err));
    },
    addUser: (req, res, next) => {
        let { name, email, phone, userType, adminid } = req.body;
        if ( typeof phone === 'string'){
            phone = parseInt(phone, 10);
        };

        req.app.get('db')
        .users_DB.create_user([name, null, email, phone, userType, adminid, null, null, null])
        .then( response => {
            res.status(200).send({
                id:response[0].id,
                name:response[0].user_name, 
                email:response[0].email,
                phone:response[0].phone,
                userType:response[0].user_type
            });
        })
        .catch(err => {console.log(err)})
    },
    editUser: (req, res, next) => {
        let { id, name, email, phone, userType, adminid } = req.body;
        if ( typeof phone === 'string'){
            phone = parseInt(phone, 10);
        };
        if (typeof id === 'string'){
            id = parseInt(id, 10)
        }
        req.app.get('db')
        .users_DB.edit_user([id, name, email, phone, userType, adminid])
        .then( response => {
            res.status(200).send({
                id:response[0].id,
                name:response[0].user_name, 
                email:response[0].email,
                phone:response[0].phone,
                userType:response[0].user_type
            });
        })
        .catch(err => {console.log(err)})
    },
    deleteUser:( req, res, next ) => {
        let { userid } = req.params;
        if (typeof userid === 'string'){
            userid = parseInt(userid)
        }
        req.app.get('db')
        .users_DB.delete_user([userid])
        .then ( response => {
            res.status(200).send(response);
        })
        .catch( err => console.log(err))
    }
}