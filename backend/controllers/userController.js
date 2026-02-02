const User = require('../models/User');
const Career = require('../models/Career');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.education = req.body.education || user.education;
      user.interests = req.body.interests || user.interests;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        education: updatedUser.education,
        interests: updatedUser.interests,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get assessment history
// @route   GET /api/users/assessment-history
// @access  Private
const getAssessmentHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('assessmentHistory.recommendedCareers');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      history: user.assessmentHistory,
      currentResults: user.assessmentResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save/Unsave career
// @route   POST /api/users/save-career/:careerId
// @route   DELETE /api/users/save-career/:careerId
// @access  Private
const toggleSaveCareer = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { careerId } = req.params;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const careerIndex = user.savedCareers.indexOf(careerId);
    
    if (careerIndex > -1) {
      // Remove if already saved
      user.savedCareers.splice(careerIndex, 1);
      await user.save();
      res.json({ message: 'Career removed from saved', saved: false });
    } else {
      // Add if not saved
      user.savedCareers.push(careerId);
      await user.save();
      res.json({ message: 'Career saved', saved: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get saved careers
// @route   GET /api/users/saved-careers
// @access  Private
const getSavedCareers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedCareers');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.savedCareers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateUserProfile,
  getUsers,
  getAssessmentHistory,
  toggleSaveCareer,
  getSavedCareers,
};
