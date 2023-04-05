const Project = require("../models/project");

module.exports.isAuthenticated = (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id).then((val) => {
        console.log(val.users._id)
        console.log(req.user)
        if ((val.users.includes(req.user._id))) {
            next();
        }
        else {
            res.status(400);
        }
    }).catch((e) => res.status(400));

    return res;
}