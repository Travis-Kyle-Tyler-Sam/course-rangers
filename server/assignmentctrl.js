module.exports = {
    getAssignment: (req, res, next) => {
        const { assignmentid } = req.params;

        req.app.get('db')
        .assignments_DB
        .get_assignment([assignmentid])
        .then( assignment => {
            res.status(200).send(assignment[0])
        })
    }
}