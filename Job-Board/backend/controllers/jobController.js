const Job = require("../models/Job");

// @desc    Fetch all jobs
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); 
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new job (Employer only)
// @route   POST /api/jobs
const createJob = async (req, res) => {
  const { title, company, location, description, salary, type } = req.body;

  // Security Check: Is the user an Employer?
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: "Access denied. Only Employers can post jobs." });
  }

  try {
    const job = new Job({
      title,
      company,
      location,
      description,
      salary,
      type,
      postedBy: req.user._id // Link to logged-in user
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

module.exports = { getJobs, getJobById, createJob };