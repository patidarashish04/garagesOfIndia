import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HeroSection.css";


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // // Redirect to /search/yourQuery so that the SearchResults component can load the results
    // if (searchQuery.trim()) {
    //   navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    // }

    //redirecting \
    navigate('/garagelist')
  };

  return (
    <div className="hero-container">
      {/* Hero Section Content */}
      <div className="hero-content">
        <h1>
          Welcome to <span className="highlight">Garage Of India</span>
        </h1>
        <p>Your all-in-one Garage universe</p>
      </div>

      {/* Features and Search Section */}
      <div className="features-container">
        <div className="garage-search-bar">
          <input
            type="text"
            placeholder="Search Garages"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn-primary" onClick={handleSearch}>
            View all Garages
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


