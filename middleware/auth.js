const Project = require("../models/project");

module.exports.isAuthenticated = (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id).then((val) => {
        if ((val.users.includes(req.user._id))) {
            next();
        }
        else {
            res.status(400).json(new Error("No such Project Exists"));
        }
    }).catch((e) => res.status(400).json(new Error("No Project Found")));

    return res;
}