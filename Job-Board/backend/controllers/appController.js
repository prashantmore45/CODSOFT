const Application = require("../models/Application");

// @desc    Apply for a job (Candidate only)
// @route   POST /api/application/:jobId
const applyForJob = async (req, res) => {
  // Security: Only Candidates can apply
  if (req.user.role !== 'candidate') {
    return res.status(403).json({ message: "Only Candidates can apply for jobs." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Please upload a resume (PDF)." });
  }

  try {
    const { jobId } = req.params;

    // Check if already applied
    const existingApp = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (existingApp) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: req.file.path // Save the path to the file
    });

    res.status(201).json({ message: "Application successful", application });
  } catch (error) {
    res.status(500).json({ message: "Application failed" });
  }
};

// @desc    Get all applications for a specific job (Employer only)
// @route   GET /api/application/:jobId
const getJobApplications = async (req, res) => {

  // Security: Only Employers can see applications
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("applicant", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { applyForJob, getJobApplications };