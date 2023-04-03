const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');
const Project = require("../models/project");
const User = require("../models/user");

module.exports.getProjects = (req, res) => {
    Project.find({}).then((val, err) => {
        if (err) {
            res.status(400).json({ err: err });
        }
        else {
            res.json(val);
        }
    }); 
    return res;
};

module.exports.getProject = (req, res) => {
    const id = req.params.projectId;
    console.log(id)
    Project.find({ _id: id }).then((val, err) => {
        console.log(val)
        if (err) {
            res.status(400).json({ err: err });
        }
        else {
            res.json(val);
        }
    });  
    return res;
};


module.exports.saveProject = (req, res) => {
    const newProject = new Project(req.body);
    Project.find({ title: req.body.title }).then((val, err) => {
        if (val.length>=1) res.status(400).json("Already exists")
        else {
            res.status(200).json(val);
            newProject.save();
        }
    })
    return res;
}

module.exports.addUser = (req, res, next) => {
    const id = req.params.projectId;
    const userId = req.body.id;
    console.log(userId);
    User.find({ _id: req.body.id }).then((val, err) => {
        Project.updateOne({ _id: id }, { $push: { users: val[0]._id } }).then((val, err) => {
            if (err) res.status(400).json({ err: err });
        });
    });
     
    return res;
}

module.exports.deleteUser = (req, res, next) => {
    const id = req.params.projectId;
    User.find({ _id: req.body.id }).then((val, err) => {
        console.log(val)
        Project.updateOne({ _id: id }, { $pull: { users: val[0]._id } }).then((val, err) => {
            console.log(val)
            if (err) res.status(400).json({ err: err });
        });
    });
    
    return res;
}


