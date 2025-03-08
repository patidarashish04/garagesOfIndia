import React, { useState } from 'react';
import axios from 'axios';

const NearbyGarages = () => {
  const [garages, setGarages] = useState([]);
  const [error, setError] = useState(null);

  const fetchNearbyGarages = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get('http://localhost:9002/api/reviews/', {
            params: { latitude, longitude },
          });
          setGarages(response.data);
        } catch (err) {
          setError(err.message);
        }
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Nearby Garages</h1>
      <button onClick={fetchNearbyGarages}>Fetch Nearby Garages</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {garages.map((garage) => (
          <div key={garage._id} className="garage">
            <h2>{garage.name}</h2>
            <p>Coordinates: {garage.location.coordinates.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyGarages;
