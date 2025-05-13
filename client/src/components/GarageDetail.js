// src/components/GarageDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GarageDetail.css'; // Optional: import custom CSS

const GarageDetail = () => {
  const { id } = useParams();
  console.log("Garage ID from params:", id);

  const [garage, setGarage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9002/api/garages/${id}`)
      .then(response => setGarage(response.data.data.data))
      .catch(error => console.error('Error fetching garage details:', error));
  }, [id]);

  if (!garage) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-secondary mb-3">Back to List</Link>
      <h1 className="text-center mb-4">Garage Details</h1>

      <div className="card mb-3">
        <div className="card-body">
          <h2 className="card-title">{garage.address}</h2>
          <p className="card-text"><strong>Contact:</strong> {garage.contact}</p>
          <p className="card-text"><strong>Verified:</strong> {garage.verified ? 'Yes' : 'No'}</p>
          <p className="card-text">
            <strong>Description:</strong>
            <br />
            {garage.description}
          </p>
          <p className="card-text"><strong>Services:</strong> {garage.services.join(', ')}</p>
          <p className="card-text"><strong>Vehicle Types:</strong> {garage.vehicleTypes.join(', ')}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3>Photos</h3>
        <div className="row">
          {garage.photos.map((photo, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <img src={photo} alt={`Garage ${index}`} className="img-fluid rounded shadow-sm" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3>Location</h3>
        // change for not reading lat and lon
        <div className="embed-responsive embed-responsive-16by9">
  {garage?.location?.lat && garage?.location?.lng ? (
    <iframe
      title="garage-location"
      className="embed-responsive-item"
      src={`https://www.google.com/maps?q=${garage.location.lat},${garage.location.lng}&hl=es;z=14&output=embed`}
      allowFullScreen
    ></iframe>
  ) : (
    <p>Location not available</p>
  )}
</div>
      </div>

      <div>
        <h3>Reviews</h3>
        {garage.reviews.length ? (
          garage.reviews.map((review, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">{review.user}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating}</h6>
                <p className="card-text">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default GarageDetail;
