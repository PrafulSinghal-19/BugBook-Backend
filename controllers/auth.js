const User = require("../models/user");
const bcrypt = require("bcrypt");
const axios = require("axios");
const mongoose = require("mongoose");

module.exports.isRegistered = async (req, res, next) => {
  const { username, name, password } = req.body;

  await User.find({ email: username })
    .then(async (val, err) => {
      if (val.length >= 1) {
        res.status(400).json({ err: "User already exist" });
      } else {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
          name: name,
          email: username,
          password: hash,
        });
        newUser.save().then(()=>next());
      }
    })
    .catch((e) => res.status(400).json(e));

  return res;
};
