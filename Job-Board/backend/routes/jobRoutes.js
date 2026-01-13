const express = require("express");
const router = express.Router();
const { getJobs, getJobById, createJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// Public Route: Anyone can see jobs
router.get("/", getJobs);

// Public Route: Anyone can see job details
router.get("/:id", getJobById);

// Protected Route: Only logged-in users (Employers) can post
router.post("/", protect, createJob);

module.exports = router;