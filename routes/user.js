const express = require("express");
const route = express.Router();
const user = require("../controllers/user");

route.post("/search",user.search);
route.patch("/addProject/:userId",user.addProject);
route.patch("/deleteProject/:userId", user.deleteProject);
route.get("/", user.getUser);


module.exports = route;