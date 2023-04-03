const express = require("express");
const router = express.Router();
const project = require("../controllers/project");

// router.post("/login");
router.post("/addProject", project.saveProject);
router.get("/project",project.getProjects);
router.get("/project/:projectId",project.getProject);

module.exports = router;