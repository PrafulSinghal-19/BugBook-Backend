const axios = require("axios");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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

module.exports.signup = async (req, res) => {
  let { email, password } = req.body.user;

  User.find({ email: email }).then((val, err) => {
    if (err != null) {
      res.json({ err: err });
    } else {
      if (val.length < 1) {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            res.status(400).json({ err: err });
          } else {
            const registeredUser = new User({
              name: "Default",
              email: email,
              password: hash,
            });
            await registeredUser.save();
            res.json(registeredUser);
          }
        });
      } else {
        bcrypt.compare(password, val[0].password, (err, hash) => {
          if (err) {
            res.json({ err: err });
          } else {
            res.json(val);
          }
        });
      }
    }
  });

  return res;
};
