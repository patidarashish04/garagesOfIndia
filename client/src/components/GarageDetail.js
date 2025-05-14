// src/components/GarageDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GarageDetail.css'; // Optional: import custom CSS

const GarageDetail = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9002/api/garages/${id}`)
      .then(response => {
        const data = response.data.data.data;
        setGarage(data);
        setPhotos(data.photos || []);
      })
      .catch(error => console.error('Error fetching garage details:', error));
  }, [id]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result]);
        // TODO: Send uploaded photo to backend if needed
      };
      reader.readAsDataURL(file);
    }
  };

  if (!garage) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-secondary mb-3">Back to List</Link>
      <h1 className="text-center mb-4">Garage Details</h1>

      <div className="card mb-3">
        <div className="card-body">
          <h2 className="text-center text-muted mb-4">{garage.name}</h2>
          <h2 className="card-title">{garage.address}</h2>
          <p className="card-text"><strong>Contact:</strong> {garage.contact}</p>
          <p className="card-text"><strong>Verified:</strong> {garage.verified ? 'Yes' : 'No'}</p>
          <p className="card-text"><strong>Description:</strong><br />{garage.description}</p>
          <p className="card-text"><strong>Services:</strong> {garage.services.join(', ')}</p>
          <p className="card-text"><strong>Vehicle Types:</strong> {garage.vehicleTypes.join(', ')}</p>
        </div>
      </div>

      {/* Photos Section */}
      <div className="mb-4">
        <h3>Photos</h3>
        <div className="row">
          {photos.map((photo, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <img src={photo} alt={`Garage ${index}`} className="img-fluid rounded shadow-sm" />
            </div>
          ))}
        </div>

        {/* Upload Button */}
        <div className="mt-3">
          <label className="btn btn-primary">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              hidden
            />
          </label>
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-4">
        <h3>Location</h3>
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

      {/* Reviews Section */}
      <div>
        <h3 className="mb-3">Reviews</h3>

        {/* Average Rating Summary */}
        {garage.reviews?.length > 0 && (
          <div className="mb-4">
            <h5 className="text-muted">
              ⭐ {(garage.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / garage.reviews.length).toFixed(1)} / 5
              <span className="ms-2 text-secondary">
                based on {garage.reviews.length} review{garage.reviews.length > 1 ? 's' : ''}
              </span>
            </h5>
          </div>
        )}

        {/* Map through reviews */}
        {garage.reviews?.length ? (
          garage.reviews.map((review, index) => (
            <div className="card mb-3 shadow-sm border-0" key={index}>
              <div className="card-body">
                {/* Avatar and user info */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
                    >
                      {review.user?.charAt(0).toUpperCase()}
                    </div>
                    <h6 className="mb-0 fw-semibold">{review.user || 'Unknown User'}</h6>
                  </div>
                  <small className="text-muted">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : 'Unknown date'}
                  </small>
                </div>

                {/* Star Rating */}
                <div className="mb-2 text-warning" style={{ fontSize: '1.1rem' }}>
                  {'★'.repeat(review.rating || 0) + '☆'.repeat(5 - (review.rating || 0))}{' '}
                  <span className="text-muted ms-2">({review.rating || 0}/5)</span>
                </div>

                {/* Comment */}
                <p className="text-secondary fst-italic mb-0">"{review.comment || 'No comment provided'}"</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default GarageDetail;
