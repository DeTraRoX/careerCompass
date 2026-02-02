const express = require('express');
const router = express.Router();
const {
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  compareCareers,
} = require('../controllers/careerController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getCareers);
router.post('/compare', compareCareers);
router.get('/:id', getCareer);
router.post('/', protect, admin, createCareer);
router.put('/:id', protect, admin, updateCareer);
router.delete('/:id', protect, admin, deleteCareer);

module.exports = router;
