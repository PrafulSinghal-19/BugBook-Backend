const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.post("/search",user.search);
router.patch("/addProject/:userId",user.addProject);
router.patch("/deleteProject/:userId",user.deleteProject);

// router.get("/:userId");
// router.get("/:userId/:projectId");
// router.get("/:userId/:projectId/:commentId");

module.exports = router;