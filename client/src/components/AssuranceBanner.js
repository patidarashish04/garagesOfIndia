import React from 'react';
import shieldIcon from '../assets/Trophy.svg';
import priceIcon from '../assets/assurance-g-1.svg';
import spareIcon from '../assets/assurance-g-2.svg';
import warrantyIcon from '../assets/assurance-g-3.svg';
import '../styles/AssuranceBanner.css';

const AssuranceBanner = () => {
  return (
    <div className="assurance-banner">
      <div className="assurance-header">
        <img src={shieldIcon} alt="Shield Icon" className="shield-icon" />
        <div>
          <h3>Garages Of India Assurance</h3>
          <p>Our promise for best care for your Car and Bike</p>
        </div>
      </div>
      <div className="assurance-features">
        <div className="feature-item">
          <img src={priceIcon} alt="Lower Price Icon" />
          <h4>Lower price than OEMs</h4>
        </div>
        <div className="feature-item">
          <img src={spareIcon} alt="Genuine Spare Icon" />
          <h4>Genuine spare parts</h4>
        </div>
        <div className="feature-item">
          <img src={warrantyIcon} alt="Warranty Icon" />
          <h4>Warranty on car service</h4>
        </div>
      </div>
    </div>
  );
};

export default AssuranceBanner;
