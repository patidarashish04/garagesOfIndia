import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [selectedGarageId, setSelectedGarageId] = useState(null);
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    topRated: false,
    quickResponse: false,
    verified: false,
    deals: false,
    trusted: false,
  });

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9002/api/garages?search=${encodeURIComponent(query)}`
        );
        let result = response.data.data.data;

        result = result?.map((item) => {
          let reviews = item?.reviews || [];
          let totalRatings = reviews.length;
          let avgRating =
            totalRatings > 0
              ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                totalRatings
              : 0;

          return { ...item, overAllRating: { totalRatings, avgRating } };
        });

        setGarages(result);
      } catch (error) {
        console.error("Error fetching garages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, [query]);

  const toggleFilter = (filter) => {
    setFilters({ ...filters, [filter]: !filters[filter] });
  };

  const filteredGarages = garages.filter((garage) => {
    if (filters.topRated && garage.overAllRating.avgRating < 4) return false;
    if (filters.verified && !garage.verified) return false;
    if (filters.quickResponse && garage.responseTime > 2) return false;
    return true;
  });

  return (
    <div className="main-container">
      <h2>Popular Garages in "{query}"</h2>
      
      {/* Filter Section */}
      <div className="filter-section">
        <button className={`filter-btn ${filters.topRated ? 'active' : ''}`} onClick={() => toggleFilter("topRated")}>
          ⭐ Top Rated
        </button>
        <button className={`filter-btn ${filters.quickResponse ? 'active' : ''}`} onClick={() => toggleFilter("quickResponse")}>
          ⚡ Quick Response
        </button>
        <button className={`filter-btn ${filters.verified ? 'active' : ''}`} onClick={() => toggleFilter("verified")}>
          ✅ Verified
        </button>
        <button className={`filter-btn ${filters.deals ? 'active' : ''}`} onClick={() => toggleFilter("deals")}>
          📜 Deals
        </button>
        <button className={`filter-btn ${filters.trusted ? 'active' : ''}`} onClick={() => toggleFilter("trusted")}>
          🏆 Trusted
        </button>
      </div>

      {/* Garage List */}
      <div className="garage-list">
        {loading ? (
          <p>Loading garages...</p>
        ) : filteredGarages.length > 0 ? (
          filteredGarages.map((garage, index) => (
            <div key={index} className="garage-card-item">
              <div className="garage-img">
                <img
                  src={
                    garage.photos[0] ||
                    "https://storage.googleapis.com/bkt-gobumper-prod-web-app-static/offers-imgs/car-repair"
                  }
                  alt={garage.name || "Garage"}
                />
              </div>
              <div className="garage-info">
                <h3 className="garage-name">{garage.name || "Unknown Garage"}</h3>
                <p className="garage-location">{garage.address || "N/A"}</p>
                <p className="rating">
                  ⭐ {garage.overAllRating.avgRating.toFixed(1)} ({garage.overAllRating.totalRatings} Reviews)
                  <span className="badge verified">Verified</span>
                  <span className="badge popular"> Popular</span>
                </p>
                <div className="actions">
                  <a href={`tel:${garage.contact}`} className="call-btn">
                    📞 {garage.contact || "N/A"}
                  </a>
                  <button
                    className="details-btn"
                    onClick={() => navigate(`/garage/${garage.id}`)}
                  >
                    View Details
                  </button>
                  <button className="enquiry-btn">Send Enquiry</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No garages found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
