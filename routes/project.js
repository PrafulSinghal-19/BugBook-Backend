const express = require("express");
const route = express.Router();
const project = require("../controllers/project");
const { isAuthenticated } = require("../middleware/auth");

route.patch("/addUser/:projectId",project.addUser);
route.patch("/deleteUser/:projectId", project.deleteUser);
route.get("/:projectId", isAuthenticated, project.getBugs);
route.post("/:projectId/addBug", isAuthenticated, project.addBug);

module.exports = route;