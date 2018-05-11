module.exports = {
    getRegistry: (req, res, next) => {
        const { adminid } = req.params;
        req.app.get('db')
        .users_DB.get_admin_people([adminid])
        .then( response => {
            let students = response.filter( user => {
                return user.user_type === 'Student'
            })
            let instructors = response.filter( user => {
                return user.user_type === 'Instructor'
            })
            res.status(200).send({students,instructors})
        })
        .catch(err => console.log(err));
    }
}