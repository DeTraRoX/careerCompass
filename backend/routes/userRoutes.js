const express = require('express');
const router = express.Router();
const { 
  updateUserProfile, 
  getUsers, 
  getAssessmentHistory,
  toggleSaveCareer,
  getSavedCareers,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.put('/profile', protect, updateUserProfile);
router.get('/assessment-history', protect, getAssessmentHistory);
router.post('/save-career/:careerId', protect, toggleSaveCareer);
router.delete('/save-career/:careerId', protect, toggleSaveCareer);
router.get('/saved-careers', protect, getSavedCareers);
router.get('/', protect, admin, getUsers);

module.exports = router;
