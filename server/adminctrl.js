module.exports = {
    getRegistry: (req, res, next) => {
        const { adminid } = req.params;
        app.get('db').get_admin_people()
    }
}