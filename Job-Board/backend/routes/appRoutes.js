const express = require("express");
const router = express.Router();
const { applyForJob, getJobApplications, getMyApplications } = require("../controllers/appController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/my-applications", protect, getMyApplications);

router.post("/:jobId", protect, upload.single("resume"), applyForJob);

router.get("/:jobId", protect, getJobApplications);

module.exports = router;