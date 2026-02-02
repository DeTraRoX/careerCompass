import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Find Your Perfect Career Path</h1>
          <p className="hero-subtitle">
            Take our comprehensive assessment to discover careers that match your interests, skills, and aspirations.
          </p>
          {user ? (
            <Link to="/assessment" className="btn btn-primary btn-large">
              Start Assessment
            </Link>
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Take Assessment</h3>
              <p>Answer our MCQ-based questions about your interests, skills, and preferences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Get Analyzed</h3>
              <p>Our system analyzes your responses and calculates scores across different career categories.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Receive Recommendations</h3>
              <p>Get personalized career recommendations based on your assessment results.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Explore Career Paths</h3>
              <p>View detailed information about each career including roadmap, salary, and growth opportunities.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="categories">
        <div className="container">
          <h2>Career Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Technology</h3>
              <p>Software Development, Data Science, Cybersecurity</p>
            </div>
            <div className="category-card">
              <h3>Management</h3>
              <p>Project Management, Business Administration, Operations</p>
            </div>
            <div className="category-card">
              <h3>Creativity</h3>
              <p>UX/UI Design, Graphic Design, Content Creation</p>
            </div>
            <div className="category-card">
              <h3>Analytical</h3>
              <p>Data Analysis, Research, Financial Analysis</p>
            </div>
            <div className="category-card">
              <h3>Communication</h3>
              <p>Marketing, Public Relations, Sales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
