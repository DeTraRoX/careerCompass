import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import './Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(location.state?.results || null);
  const [loading, setLoading] = useState(!results);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  useEffect(() => {
    if (!results) {
      fetchResults();
    }
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axiosInstance.get('/api/assessment/results');
      if (response.data) {
        setResults(response.data);
      } else {
        navigate('/assessment');
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        navigate('/login');
      } else {
        navigate('/assessment');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading results...</div>;
  }

  if (!results) {
    return (
      <div className="result-container">
        <div className="container">
          <div className="card">
            <h2>No Results Found</h2>
            <p>Please complete the assessment first.</p>
            <Link to="/assessment" className="btn btn-primary">
              Take Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { scores, recommendedCareers } = results;
  const categories = ['technology', 'management', 'creativity', 'analytical', 'communication'];

  return (
    <div className="result-container">
      <div className="container">
        <div className="result-header">
          <h2>Your Assessment Results</h2>
          <p className="result-subtitle">Based on your responses, here are your career recommendations</p>
        </div>

        <div className="scores-section">
          <h3>Your Category Scores</h3>
          <div className="scores-grid">
            {categories.map((category) => (
              <div key={category} className="score-card">
                <div className="score-label">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                <div className="score-value">{scores[category] || 0}%</div>
                <div className="score-bar">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${scores[category] || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendations-section">
          <div className="recommendations-header">
            <h3>Recommended Careers</h3>
            {selectedForCompare.length > 0 && (
              <Link
                to="/compare"
                state={{ careerIds: selectedForCompare }}
                className="btn btn-primary"
              >
                Compare ({selectedForCompare.length})
              </Link>
            )}
          </div>
          {recommendedCareers && recommendedCareers.length > 0 ? (
            <>
              <div className="careers-grid">
                {recommendedCareers.map((career) => (
                  <div key={career._id} className="career-card-wrapper">
                    <div className="compare-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedForCompare.includes(career._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (selectedForCompare.length < 3) {
                              setSelectedForCompare([...selectedForCompare, career._id]);
                            } else {
                              alert('You can compare maximum 3 careers at once');
                            }
                          } else {
                            setSelectedForCompare(selectedForCompare.filter(id => id !== career._id));
                          }
                        }}
                      />
                      <label>Compare</label>
                    </div>
                    <Link
                      to={`/career/${career._id}`}
                      className="career-card-link"
                    >
                      <div className="career-card">
                        <h4>{career.title}</h4>
                        <p className="career-description">{career.description}</p>
                        <div className="career-meta">
                          <span className="career-category">{career.category}</span>
                          <span className="career-salary">
                            ₹{career.salaryRange.min.toLocaleString('en-IN')} - ₹{career.salaryRange.max.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {selectedForCompare.length > 0 && (
                <div className="compare-hint">
                  <p>Select up to 3 careers to compare side-by-side</p>
                </div>
              )}
            </>
          ) : (
            <div className="card">
              <p>No recommendations available. Please try taking the assessment again.</p>
              <Link to="/assessment" className="btn btn-primary">
                Retake Assessment
              </Link>
            </div>
          )}
        </div>

        <div className="result-actions">
          <Link to="/assessment" className="btn btn-outline">
            Retake Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
