import React, { useState } from 'react';
import './CareerSearch.css';

const CareerSearch = ({ onSearch, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilter = (newFilters = {}) => {
    const filterData = {
      category: newFilters.category !== undefined ? newFilters.category : category,
      minSalary: newFilters.minSalary !== undefined ? newFilters.minSalary : minSalary,
      maxSalary: newFilters.maxSalary !== undefined ? newFilters.maxSalary : maxSalary,
      sortBy: newFilters.sortBy !== undefined ? newFilters.sortBy : sortBy,
    };
    onFilter(filterData);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setMinSalary('');
    setMaxSalary('');
    setSortBy('');
    onSearch('');
    onFilter({ category: '', minSalary: '', maxSalary: '', sortBy: '' });
  };

  return (
    <div className="career-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search careers by name, skills, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">
            🔍 Search
          </button>
        </div>
      </form>

      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                handleFilter({ category: e.target.value });
              }}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="management">Management</option>
              <option value="creativity">Creativity</option>
              <option value="analytical">Analytical</option>
              <option value="communication">Communication</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Salary (₹)</label>
            <input
              type="number"
              placeholder="Min"
              value={minSalary}
              onChange={(e) => {
                setMinSalary(e.target.value);
                handleFilter({ minSalary: e.target.value });
              }}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Max Salary (₹)</label>
            <input
              type="number"
              placeholder="Max"
              value={maxSalary}
              onChange={(e) => {
                setMaxSalary(e.target.value);
                handleFilter({ maxSalary: e.target.value });
              }}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleFilter({ sortBy: e.target.value });
              }}
              className="filter-select"
            >
              <option value="">Default</option>
              <option value="title">Title (A-Z)</option>
              <option value="salaryAsc">Salary (Low to High)</option>
              <option value="salaryDesc">Salary (High to Low)</option>
            </select>
          </div>

          <div className="filter-group">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSearch;
