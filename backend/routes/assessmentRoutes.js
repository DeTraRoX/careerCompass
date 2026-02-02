const express = require('express');
const router = express.Router();
const { submitAssessment, getAssessmentResults } = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

router.post('/submit', protect, submitAssessment);
router.get('/results', protect, getAssessmentResults);

module.exports = router;
