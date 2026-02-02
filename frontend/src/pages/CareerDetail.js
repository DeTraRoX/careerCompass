import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import './CareerDetail.css';

const CareerDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCareer();
    checkIfSaved();
  }, [id, user]);

  const fetchCareer = async () => {
    try {
      const response = await axiosInstance.get(`/api/careers/${id}`);
      if (response.data) {
        setCareer(response.data);
      }
    } catch (error) {
      console.error('Error fetching career:', error);
      if (error.response?.status === 404) {
        // Career not found - will show error message in UI
      }
    } finally {
      setLoading(false);
    }
  };

  const checkIfSaved = async () => {
    if (!user) return;
    try {
      const response = await axiosInstance.get('/api/users/saved-careers');
      const savedIds = response.data.map(c => c._id);
      setIsSaved(savedIds.includes(id));
    } catch (error) {
      console.error('Error checking saved careers:', error);
    }
  };

  const handleSaveCareer = async () => {
    if (!user) {
      alert('Please login to save careers');
      return;
    }
    setSaving(true);
    try {
      const response = await axiosInstance.post(`/api/users/save-career/${id}`);
      setIsSaved(response.data.saved);
    } catch (error) {
      console.error('Error saving career:', error);
    } finally {
      setSaving(false);
    }
  };

  const roadmapSteps = [
    { key: 'education', icon: '🎓', title: 'Education' },
    { key: 'skills', icon: '💼', title: 'Skills' },
    { key: 'certifications', icon: '🏆', title: 'Certifications' },
    { key: 'internship', icon: '🤝', title: 'Internship' },
    { key: 'job', icon: '💻', title: 'Job' },
  ];

  if (loading) {
    return <div className="loading">Loading career details...</div>;
  }

  if (!career) {
    return (
      <div className="career-detail-container">
        <div className="container">
          <div className="card">
            <h2>Career not found</h2>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-detail-container">
      <div className="container">
        <Link to="/result" className="back-link">
          ← Back to Results
        </Link>

        <div className="career-header">
          <div className="career-title-section">
            {career.image && (
              <img src={career.image} alt={career.title} className="career-image" />
            )}
            <div>
              <h1>{career.title}</h1>
              <div className="career-badge">
                <span className="badge-category">{career.category}</span>
              </div>
            </div>
          </div>
          {user && (
            <button
              onClick={handleSaveCareer}
              disabled={saving}
              className={`btn ${isSaved ? 'btn-secondary' : 'btn-primary'}`}
            >
              {saving ? 'Saving...' : isSaved ? '✓ Saved' : '💾 Save Career'}
            </button>
          )}
        </div>

        <div className="career-content">
          <div className="career-main">
            <div className="card">
              <h2>Description</h2>
              <p className="career-description">{career.description}</p>
            </div>

            <div className="card">
              <h2>Required Skills</h2>
              <ul className="skills-list">
                {career.requiredSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h2>Career Roadmap</h2>
              <div className="roadmap-visualization">
                {roadmapSteps.map((step, index) => (
                  <div key={step.key} className="roadmap-step-visual">
                    <div className="step-icon-wrapper">
                      <div className="step-icon">{step.icon}</div>
                      {index < roadmapSteps.length - 1 && <div className="step-connector"></div>}
                    </div>
                    <div className="step-content-visual">
                      <h3>{step.title}</h3>
                      <p>{career.roadmap[step.key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {career.videos && career.videos.length > 0 && (
              <div className="card">
                <h2>📹 Learning Videos</h2>
                <div className="videos-list">
                  {career.videos.map((video, index) => (
                    <div key={index} className="video-item">
                      <div className="video-icon">▶️</div>
                      <div className="video-content">
                        <h4>{video.title}</h4>
                        {video.description && <p className="video-description">{video.description}</p>}
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="video-link"
                        >
                          Watch Video →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {career.resources && career.resources.length > 0 && (
              <div className="card">
                <h2>📚 Resources</h2>
                <div className="resources-list">
                  {career.resources.map((resource, index) => (
                    <div key={index} className="resource-item">
                      <div className="resource-icon">
                        {resource.type === 'course' && '📖'}
                        {resource.type === 'book' && '📕'}
                        {resource.type === 'website' && '🌐'}
                        {!['course', 'book', 'website'].includes(resource.type) && '📄'}
                      </div>
                      <div className="resource-content">
                        <h4>{resource.title}</h4>
                        {resource.description && (
                          <p className="resource-description">{resource.description}</p>
                        )}
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-link"
                        >
                          Visit Resource →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {career.notes && (
              <div className="card">
                <h2>📝 Important Notes</h2>
                <div className="notes-content">
                  <p>{career.notes}</p>
                </div>
              </div>
            )}

            <div className="card">
              <h2>Growth Opportunities</h2>
              <p>{career.growthOpportunities}</p>
            </div>
          </div>

          <div className="career-sidebar">
            <div className="card sidebar-card">
              <h3>Salary Range</h3>
              <div className="salary-range">
                <span className="salary-amount">
                  ₹{career.salaryRange.min.toLocaleString('en-IN')} - ₹{career.salaryRange.max.toLocaleString('en-IN')}
                </span>
                <span className="salary-currency">{career.salaryRange.currency}</span>
              </div>
            </div>

            <div className="card sidebar-card">
              <h3>Category</h3>
              <span className="category-badge">{career.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
