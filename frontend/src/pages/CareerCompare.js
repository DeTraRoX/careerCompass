import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import './CareerCompare.css';

const CareerCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareers, setSelectedCareers] = useState(location.state?.careerIds || []);

  useEffect(() => {
    if (selectedCareers.length > 0) {
      fetchCareers();
    } else {
      setLoading(false);
    }
  }, [selectedCareers]);

  const fetchCareers = async () => {
    try {
      const response = await axiosInstance.post('/api/careers/compare', {
        careerIds: selectedCareers,
      });
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeCareer = (careerId) => {
    const newSelected = selectedCareers.filter(id => id !== careerId);
    setSelectedCareers(newSelected);
    if (newSelected.length === 0) {
      navigate('/result');
    } else {
      fetchCareers();
    }
  };

  if (loading) {
    return <div className="loading">Loading comparison...</div>;
  }

  if (careers.length === 0) {
    return (
      <div className="compare-container">
        <div className="container">
          <div className="card">
            <h2>No Careers Selected</h2>
            <p>Please select careers to compare from the results page.</p>
            <Link to="/result" className="btn btn-primary">
              Go to Results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-container">
      <div className="container">
        <div className="compare-header">
          <h1>Career Comparison</h1>
          <Link to="/result" className="btn btn-outline">
            ← Back to Results
          </Link>
        </div>

        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Attribute</th>
                {careers.map((career) => (
                  <th key={career._id}>
                    <div className="career-header-cell">
                      <h3>{career.title}</h3>
                      <button
                        onClick={() => removeCareer(career._id)}
                        className="btn-remove"
                        title="Remove from comparison"
                      >
                        ×
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="attribute-label">Category</td>
                {careers.map((career) => (
                  <td key={career._id}>
                    <span className="category-badge">{career.category}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Description</td>
                {careers.map((career) => (
                  <td key={career._id}>{career.description}</td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Salary Range</td>
                {careers.map((career) => (
                  <td key={career._id} className="salary-cell">
                    ₹{career.salaryRange.min.toLocaleString('en-IN')} - ₹{career.salaryRange.max.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Required Skills</td>
                {careers.map((career) => (
                  <td key={career._id}>
                    <ul className="skills-list-compare">
                      {career.requiredSkills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Education</td>
                {careers.map((career) => (
                  <td key={career._id}>{career.roadmap.education}</td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Certifications</td>
                {careers.map((career) => (
                  <td key={career._id}>{career.roadmap.certifications}</td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Growth Opportunities</td>
                {careers.map((career) => (
                  <td key={career._id}>{career.growthOpportunities}</td>
                ))}
              </tr>
              <tr>
                <td className="attribute-label">Actions</td>
                {careers.map((career) => (
                  <td key={career._id}>
                    <Link to={`/career/${career._id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CareerCompare;
