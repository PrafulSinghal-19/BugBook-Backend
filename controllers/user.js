const Project = require("../models/project");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const axios = require("axios");
const mongoose = require("mongoose");

module.exports.search = (req, res, next) => {
  const name = req.body.search;
  console.log(`/${name}/i`);
  User.find({ name: { $regex: `^${name}`, $options: "i" } }).then(
    (val, err) => {
      res.json(val);
    }
  );
  return res;
};

module.exports.addProject = (req, res, next) => {
  const id = req.params.userId;
  Project.find({ _id: req.body.id }).then((val, err) => {
    User.updateOne({ _id: id }, { $push: { projects: val[0]._id } }).then(
      (val, err) => {
        if (err) res.status(400).json({ err: err });
      }
    );
  });
  return res;
};

module.exports.deleteProject = (req, res, next) => {
  const id = req.params.userId;
  Project.find({ _id: req.body.id }).then((val, err) => {
    User.updateOne({ _id: id }, { $pull: { projects: val[0]._id } }).then(
      (val, err) => {
        if (err) res.status(400).json({ err: err });
      }
    );
  });
  return res;
};

