import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import './AssessmentHistory.css';

const AssessmentHistory = () => {
  const [history, setHistory] = useState([]);
  const [currentResults, setCurrentResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get('/api/users/assessment-history');
      setHistory(response.data.history || []);
      setCurrentResults(response.data.currentResults);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="loading">Loading assessment history...</div>;
  }

  return (
    <div className="history-container">
      <div className="container">
        <div className="history-header">
          <h1>Assessment History</h1>
          <Link to="/assessment" className="btn btn-primary">
            Take New Assessment
          </Link>
        </div>

        {currentResults && (
          <div className="current-results-section">
            <h2>Current Results</h2>
            <div className="scores-card">
              <div className="scores-grid">
                {Object.entries(currentResults).map(([category, score]) => (
                  <div key={category} className="score-item">
                    <div className="score-label">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    <div className="score-value">{score}%</div>
                    <div className="score-bar">
                      <div
                        className="score-bar-fill"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/result" className="btn btn-outline">
                View Current Recommendations
              </Link>
            </div>
          </div>
        )}

        <div className="history-section">
          <h2>Past Assessments</h2>
          {history.length === 0 ? (
            <div className="card">
              <p>No assessment history available. Take your first assessment to get started!</p>
              <Link to="/assessment" className="btn btn-primary">
                Take Assessment
              </Link>
            </div>
          ) : (
            <div className="history-list">
              {history.map((assessment, index) => (
                <div
                  key={index}
                  className={`history-item ${selectedHistory === index ? 'expanded' : ''}`}
                  onClick={() => setSelectedHistory(selectedHistory === index ? null : index)}
                >
                  <div className="history-item-header">
                    <div className="history-date">
                      <span className="date-icon">📅</span>
                      {formatDate(assessment.date)}
                    </div>
                    <span className="expand-icon">{selectedHistory === index ? '−' : '+'}</span>
                  </div>
                  {selectedHistory === index && (
                    <div className="history-item-content">
                      <div className="history-scores">
                        <h4>Category Scores</h4>
                        <div className="scores-grid-small">
                          {Object.entries(assessment.scores).map(([category, score]) => (
                            <div key={category} className="score-item-small">
                              <span className="score-label-small">{category}</span>
                              <span className="score-value-small">{score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {assessment.recommendedCareers && assessment.recommendedCareers.length > 0 && (
                        <div className="history-careers">
                          <h4>Recommended Careers</h4>
                          <div className="careers-list">
                            {assessment.recommendedCareers.map((career) => (
                              <Link
                                key={career._id}
                                to={`/career/${career._id}`}
                                className="career-link"
                              >
                                {career.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentHistory;
