const express = require("express");
const router = express.Router();
const { createQuiz } = require("../controllers/quizController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createQuiz);

module.exports = router;
