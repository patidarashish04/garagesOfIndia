// components/Brands.js
import React, { useState, useEffect } from 'react';
import { fetchBrands } from '../components/brandService';

const Brands = () => {
  const [activeTab, setActiveTab] = useState('car');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    loadBrands(activeTab);
  }, [activeTab]);

  const loadBrands = async (type) => {
    try {
      const response = await fetchBrands(type);
      console.log('Response from fetchBrands:', response);
      setBrands(response); // Update state with the response data
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  return (
    <div className="brands-container">
      <h2>Brands Serviced By Us</h2>
      <p>
        Choose from OEM Authorized Service Centers, Multi Brand Garages, and Trusted Local Mechanics
      </p>
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'car' ? 'active' : ''}`}
          onClick={() => setActiveTab('car')}
        >
          CAR
        </button>
        <button
          className={`tab-btn ${activeTab === 'bike' ? 'active' : ''}`}
          onClick={() => setActiveTab('bike')}
        >
          BIKE
        </button>
      </div>
      <div className="brands-list">
        <ul>
          {brands.map((brand) => (
            <li key={brand._id}>{brand.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Brands;
