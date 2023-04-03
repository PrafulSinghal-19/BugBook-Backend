const User = require("../models/user");
const bcrypt = require("bcrypt");
const axios = require("axios");
const mongoose = require("mongoose");

module.exports.github_oauth = async (req, res) => {
    let response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET_KEY,
        code: req.body.code,
      },
      { headers: { Accept: "application/json" } }
    );
  
    response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: "Bearer " + response.data.access_token },
    });
  
    return res.json(response.data);
};
  
module.exports.google_oauth = (req, res) => {
    
}
  
  module.exports.logIn = async (req, res) => {
    const { email, password } = req.body.user;
    User.find({ email: email }).then(async (val, err) => {
      if (val.length == 0) res.status(400).json(new Error("No such User Exist"));
      else {
        bcrypt.compare(password, val[0].password, (err, hash) => {
          if (err) {
            res.json({ err: err });
          } else {
            if (hash) res.json("Authenticated");
            else res.status(400).json(new Error("Invalid Password"));
          }
        });
      }
    });
    return res;
  };
  
  module.exports.signIn = async(req, res) => {
    const { name, email, password } = req.body.user;
  
    await User.find({ email: email })
      .then(async (val, err) => {
        if (val.length >= 1) {
          res.status(400).json({ err: "User already exist" });
        } else {
          const hash = await bcrypt.hash(password, 10);
          const newUser = new User({ name: name, email: email, password: hash });
          newUser.save();
          res.json(newUser);
        }
      })
      .catch((e) => res.status(400).json(e));
  
    return res;
  };
  