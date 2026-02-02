// API Configuration
// In production, this will use REACT_APP_API_URL from environment variables
// In development, it defaults to localhost:5000

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default API_URL;
