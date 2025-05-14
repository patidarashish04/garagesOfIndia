import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/GarageCard.css";

const GarageCard = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    axios
      .get("http://localhost:9002/api/garages")
      .then((res) => {
        let result = res.data.data.data;
        result = result?.map(item => {
          let reviews = item?.reviews;
          let overAllRating = {
            totalRating: reviews.length,
            averageRating: 0,
            MaxRating: 5
          };
          let sumofRatings = 0;
          reviews?.forEach(element => {
            sumofRatings += isNaN(element.rating) ? 0 : element.rating;
          });
          overAllRating.averageRating = sumofRatings > 0 ? sumofRatings / overAllRating.totalRating : 0;
          return { ...item, overAllRating: overAllRating };
        })
        setGarages(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching garages:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="garage-section">
      <h2 id="garages" className="text-center font-bold text-2xl my-8">
        Garages List
      </h2>
      <div className="garage-list-main" >
        {garages.length > 0 ? (
          garages.map((garage, index) => (
            <div key={index} className="card mb-3 garage-card" onClick={() => navigate(`/garage/${garage.id}`)}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={garage.photos[0] || "https://storage.googleapis.com/bkt-gobumper-prod-web-app-static/offers-imgs/car-repair"}
                    className="img-fluid rounded-start garage-image"
                    alt={garage.name || "Garage"}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{garage.name || "Unknown Garage"}</h5>
                    <p className="card-text">
                      <strong>Address:</strong> {garage.address || "Not available"}
                    </p>
                    <p className="card-text">
                      <span className="badge bg-success">
                        {garage.overAllRating.averageRating ? `${garage.overAllRating.averageRating} ★` : "No rating"}{" "}
                        ({garage.overAllRating.totalRating || 0} Reviews)
                      </span>
                    </p>
                    <div className="services-container">
                      {Array.isArray(garage.services) && garage.services.length > 0 ? (
                        garage.services.map((service, index) => (
                          <div key={index} className="service-item">
                            <span className="badge bg-secondary">
                              {service.name}: ₹{service.price}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span>No services available</span>
                      )}
                    </div>
                    <div className="actions">
                      <p className="card-text">
                        <strong>Contact:</strong> {garage.contact || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-garages">No garages found</div>
        )}
      </div>
    </section>
  );
};

export default GarageCard;
