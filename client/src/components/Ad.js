import React, { useState, useEffect } from 'react';
import '../styles/Ad.css'; // Create styles here

const ads = [
  {
    image: require('../assets/BasicWheelCare.jpeg'), // Replace with your own image paths
    title: "Drive smart with our app",
    description: "Unlock exclusive discounts, special offers, and price drops every day",
    buttonText: "Download App",
    link: "/download"
  },
  {
    image: require('../assets/LuxuryServicePremium.jpeg'),
    title: "Packers & Movers",
    description: "Get best deal for moving services quickly and safely",
    buttonText: "Get Best Deal",
    link: "/packers-movers"
  },
  {
    image: require('../assets/MaxServicePackage.jpeg'),
    title: "Service Your Car",
    description: "Book your car service in 3 simple steps with our trusted garages",
    buttonText: "Book Now",
    link: "/car-service"
  }
];

const AdBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000); // 5seconds
    return () => clearInterval(interval);
  }, []);

  const currentAd = ads[currentIndex];

  return (
    <div className="adv-banner">
      <img src={currentAd.image} alt={currentAd.title} className="adv-image" />
      <div className="adv-content">
        <h2>{currentAd.title}</h2>
        <p>{currentAd.description}</p>
        <a href={currentAd.link} className="adv-button">{currentAd.buttonText}</a>
      </div>
    </div>
  );
};

export default AdBanner;
