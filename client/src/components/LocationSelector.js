
import React, { useState, useEffect } from "react";
import "../styles/LocationSelector.css";

import delhiImg from '../assets/delhiIcon.png';
import bangaloreImg from '../assets/BangaloreIcon.png';
import mumbaiImg from '../assets/mumbaiIcon.png';
import chennaiImg from '../assets/chennaiIcon.png';
// Add more imports as needed

// const CitySelector = ({ onCitySelect }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch popular cities on mount
//   useEffect(() => {
//     fetch('/api/city/popular')
//       .then(res => res.data.data.json())
//       .then(data => setCities(data))
//       .catch(console.error);
//   }, []);

//   const handleGeoLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser');
//       return;
//     }

//     setIsLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const response = await fetch(
//             `/api/geocode?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
//           );
//           const city = await response.data.data.json();
//           onCitySelect(city);
//         } catch (error) {
//           alert('Error getting location');
//         }
//         setIsLoading(false);
//       },
//       (error) => {
//         alert('Please enable location permissions');
//         setIsLoading(false);
//       }
//     );
//   };

//   const handleSearch = async () => {
//     if (searchQuery.length < 2) return;
    
//     try {
//       const response = await fetch(`/api/city/search?q=${encodeURIComponent(searchQuery)}`);
//       const results = await response.data.data.json();
//       setCities(results);
//     } catch (error) {
//       console.error('Search failed:', error);
//     }
//   };

//   return (
//     <div className="city-selector-container">
//       <div className="search-section">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search for your city"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyUp={handleSearch}
//         />
//       </div>

//       <button 
//         className="geo-button"
//         onClick={handleGeoLocation} 
//         disabled={isLoading}
//       >
//         {isLoading ? 'Detecting Location...' : 'Use Current Location'}
//       </button>

//       <div className="popular-cities">
//         <h3>Popular Cities</h3>
//         <div className="cities-list">
//           {cities.map(city => (
//             <div 
//               key={city._id} 
//               className="city-item"
//               onClick={() => onCitySelect(city)}
//             >
//               {city.name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CitySelector;

const cities = [
  { name: "Delhi NCR", img: delhiImg },
  { name: "Bangalore", img: bangaloreImg },
  { name: "Mumbai", img: mumbaiImg },
  { name: "Chennai", img: chennaiImg },
  // Add more cities...
];

const LocationModal = ({ closeModal, setCurrentCity }) => {
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCityClick = (cityName) => {
    setCurrentCity(cityName);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>Select Your City</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search for your city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="current-location-button" onClick={() => alert("Fetching current location...")}>
          Use Current Location
        </button>
        <div className="city-grid">
          {filteredCities.map((city) => (
            <div
              key={city.name}
              className="city-card"
              onClick={() => handleCityClick(city.name)}
            >
              <img src={city.img} alt={city.name} className="city-image" />
              <p className="city-name">{city.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

