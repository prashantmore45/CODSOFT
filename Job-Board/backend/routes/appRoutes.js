const express = require("express");
const router = express.Router();
const { applyForJob, getJobApplications } = require("../controllers/appController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Candidate Apply Route (Protected + File Upload)
router.post("/:jobId", protect, upload.single("resume"), applyForJob);

// Employer View Applications Route (Protected)
router.get("/:jobId", protect, getJobApplications);

module.exports = router;