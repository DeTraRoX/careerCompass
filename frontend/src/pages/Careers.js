import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import CareerSearch from '../components/CareerSearch';
import './Careers.css';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minSalary: '',
    maxSalary: '',
    sortBy: '',
  });

  useEffect(() => {
    fetchCareers();
  }, [filters]);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.minSalary) params.append('minSalary', filters.minSalary);
      if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await axiosInstance.get(`/api/careers?${params.toString()}`);
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
  };

  const handleFilter = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="careers-page">
      <div className="container">
        <div className="page-header">
          <h1>Explore Careers</h1>
          <p>Discover and compare different career paths</p>
        </div>

        <CareerSearch onSearch={handleSearch} onFilter={handleFilter} />

        {loading ? (
          <div className="loading">Loading careers...</div>
        ) : careers.length === 0 ? (
          <div className="card">
            <p>No careers found matching your criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="careers-stats">
              <p>Found {careers.length} career{careers.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="careers-grid">
              {careers.map((career) => (
                <div key={career._id} className="career-card">
                  {career.image && (
                    <img src={career.image} alt={career.title} className="career-card-image" />
                  )}
                  <div className="career-card-content">
                    <div className="career-card-header">
                      <h3>{career.title}</h3>
                      <span className="career-card-category">{career.category}</span>
                    </div>
                    <p className="career-card-description">{career.description}</p>
                    <div className="career-card-footer">
                      <div className="career-card-salary">
                        ₹{career.salaryRange.min.toLocaleString('en-IN')} - ₹{career.salaryRange.max.toLocaleString('en-IN')}
                      </div>
                      <Link to={`/career/${career._id}`} className="btn btn-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Careers;
