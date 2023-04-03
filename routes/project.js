const express = require("express");
const router = express.Router();
const project = require("../controllers/project");

router.patch("/addUser/:projectId",project.addUser);
router.patch("/deleteUser/:projectId",project.deleteUser);

module.exports = router;