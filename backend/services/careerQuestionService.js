const axios = require('axios');

/**
 * Career-specific question service
 * This service can fetch questions from various career assessment APIs
 */

/**
 * Example: Fetch questions from a hypothetical career API
 * Replace with actual API endpoints when available
 */
const fetchCareerQuestions = async (apiConfig) => {
  try {
    const { url, apiKey, category } = apiConfig;
    
    const headers = {};
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
      headers['X-API-Key'] = apiKey;
    }

    const params = {};
    if (category) {
      params.category = category;
    }

    const response = await axios.get(url, {
      headers,
      params,
    });

    // Transform to our format
    return response.data.map(q => ({
      question: q.question || q.text,
      options: q.options || q.choices,
      category: q.category || 'career',
      source: 'external',
    }));
  } catch (error) {
    console.error('Error fetching career questions:', error);
    return [];
  }
};

/**
 * Fetch questions from multiple sources and merge
 */
const fetchFromMultipleSources = async (sources) => {
  const allQuestions = [];

  for (const source of sources) {
    try {
      const questions = await fetchCareerQuestions(source);
      allQuestions.push(...questions);
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
    }
  }

  return allQuestions;
};

module.exports = {
  fetchCareerQuestions,
  fetchFromMultipleSources,
};
