/**
 * Configuration for external APIs
 * Add your API keys and endpoints here
 */

module.exports = {
  // Open Trivia Database (Free, no API key required)
  opentdb: {
    baseUrl: 'https://opentdb.com/api.php',
    requiresAuth: false,
    rateLimit: 50, // requests per day (approximate)
  },

  // Example: Custom Career Assessment API
  // Replace with actual API when available
  careerAPI: {
    baseUrl: process.env.CAREER_API_URL || '',
    apiKey: process.env.CAREER_API_KEY || '',
    requiresAuth: true,
  },

  // Example: Another assessment service
  assessmentService: {
    baseUrl: process.env.ASSESSMENT_API_URL || '',
    apiKey: process.env.ASSESSMENT_API_KEY || '',
    requiresAuth: true,
  },
};
