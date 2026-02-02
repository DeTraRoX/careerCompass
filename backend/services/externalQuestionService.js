const axios = require('axios');

/**
 * Fetch questions from Open Trivia Database API
 * This is a free API that provides quiz questions
 * Note: These are general knowledge questions, not career-specific
 */
const fetchFromOpenTriviaDB = async (amount = 10, category = null) => {
  try {
    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    if (category) {
      url += `&category=${category}`;
    }

    const response = await axios.get(url);
    
    if (response.data.response_code === 0) {
      // Transform Open Trivia DB format to our format
      return response.data.results.map((q, index) => ({
        question: q.question,
        options: [
          { text: q.correct_answer, isCorrect: true },
          ...q.incorrect_answers.map(answer => ({ text: answer, isCorrect: false }))
        ].sort(() => Math.random() - 0.5), // Shuffle options
        category: 'external',
        source: 'opentdb',
        difficulty: q.difficulty,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching from Open Trivia DB:', error);
    return [];
  }
};

/**
 * Fetch questions from a custom JSON API endpoint
 * You can host your own questions API or use other services
 */
const fetchFromCustomAPI = async (apiUrl, headers = {}) => {
  try {
    const response = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching from custom API:', error);
    return [];
  }
};

/**
 * Main function to fetch questions from external sources
 * Falls back to database if external APIs fail
 */
const fetchExternalQuestions = async (source = 'opentdb', options = {}) => {
  switch (source.toLowerCase()) {
    case 'opentdb':
      return await fetchFromOpenTriviaDB(options.amount || 10, options.category);
    
    case 'custom':
      if (!options.apiUrl) {
        throw new Error('Custom API URL is required');
      }
      return await fetchFromCustomAPI(options.apiUrl, options.headers || {});
    
    default:
      return [];
  }
};

module.exports = {
  fetchExternalQuestions,
  fetchFromOpenTriviaDB,
  fetchFromCustomAPI,
};
