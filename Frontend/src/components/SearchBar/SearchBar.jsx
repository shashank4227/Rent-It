import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export const SearchBar = ({ initialQuery = '' }) => {
  const [location, setLocation] = useState(initialQuery);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLocation(initialQuery);
  }, [initialQuery]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const query = location.trim();
    if (!query) {
      setSearchError('Please enter a campus or equipment name to search.');
      return;
    }
    setSearchError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tours/search/${encodeURIComponent(query)}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/results?q=${encodeURIComponent(query)}`, { state: { searchResults: data } });
      } else {
        setSearchError(data.message || 'Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      setSearchError('Search failed. Please check your connection.');
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <span className="icon"><i className="ri-map-pin-2-line"></i></span>
          <div className="input-content">
            <label className="input-label">Campus/Lab Location</label>
            <input
              className="search-input"
              type="text"
              placeholder="Search by campus or lab..."
              value={location}
              onChange={(e) => { setLocation(e.target.value); setSearchError(''); }}
            />
          </div>
        </div>
        <button type="submit" className="search-button">
          <i className="ri-search-line"></i> Find Equipment
        </button>
      </form>
      {searchError && <p className="search-error">{searchError}</p>}
    </div>
  );
};
