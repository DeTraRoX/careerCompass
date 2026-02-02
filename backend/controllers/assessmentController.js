const User = require('../models/User');
const Career = require('../models/Career');

// @desc    Submit assessment answers
// @route   POST /api/assessment/submit
// @access  Private
const submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, optionIndex, question }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Invalid answers format. Please provide answers array.' });
    }

    // Calculate category scores
    const categoryScores = {
      technology: 0,
      management: 0,
      creativity: 0,
      analytical: 0,
      communication: 0,
    };

    let totalQuestions = 0;

    // Process each answer
    for (const answer of answers) {
      const { questionId, optionIndex, question } = answer;
      
      if (question && question.options && Array.isArray(question.options) && question.options[optionIndex]) {
        const selectedOption = question.options[optionIndex];
        if (selectedOption && selectedOption.categories) {
          totalQuestions++;

          // Add scores from selected option
          Object.keys(categoryScores).forEach((category) => {
            categoryScores[category] += selectedOption.categories[category] || 0;
          });
        }
      }
    }

    if (totalQuestions === 0) {
      return res.status(400).json({ message: 'No valid answers provided. Please complete the assessment.' });
    }

    // Calculate percentages (assuming max score per question is 5)
    const maxPossibleScore = totalQuestions * 5;
    const categoryPercentages = {};
    
    Object.keys(categoryScores).forEach((category) => {
      categoryPercentages[category] = maxPossibleScore > 0
        ? Math.round((categoryScores[category] / maxPossibleScore) * 100)
        : 0;
    });

    // Update user's assessment results
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update current results
    user.assessmentResults = categoryPercentages;

    // Get recommended careers based on scores
    const recommendedCareers = await getRecommendedCareers(categoryPercentages);
    user.recommendedCareers = recommendedCareers.map(career => career._id);

    // Add to assessment history
    user.assessmentHistory.push({
      date: new Date(),
      scores: categoryPercentages,
      recommendedCareers: recommendedCareers.map(career => career._id),
    });

    await user.save();

    res.json({
      scores: categoryPercentages,
      recommendedCareers: recommendedCareers,
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    res.status(500).json({ message: error.message || 'Server error during assessment submission' });
  }
};

// Rule-based recommendation logic
const getRecommendedCareers = async (scores) => {
  const recommendations = [];
  const threshold = 70; // 70% threshold for recommendations

  // Get careers based on highest scoring categories
  const sortedCategories = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score >= threshold);

  for (const [category, score] of sortedCategories) {
    const careers = await Career.find({ category });
    recommendations.push(...careers);
  }

  // If no category meets threshold, recommend top 2 categories
  if (recommendations.length === 0) {
    const topCategories = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([category]) => category);

    for (const category of topCategories) {
      const careers = await Career.find({ category });
      recommendations.push(...careers);
    }
  }

  // Remove duplicates
  const uniqueCareers = Array.from(
    new Map(recommendations.map(career => [career._id.toString(), career])).values()
  );

  return uniqueCareers.slice(0, 5); // Return top 5 recommendations
};

// @desc    Get user assessment results
// @route   GET /api/assessment/results
// @access  Private
const getAssessmentResults = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('recommendedCareers');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      scores: user.assessmentResults,
      recommendedCareers: user.recommendedCareers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitAssessment,
  getAssessmentResults,
};
