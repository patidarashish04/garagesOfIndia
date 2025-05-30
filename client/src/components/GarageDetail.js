import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GarageDetail.css';
import { AuthContext } from '../context/AuthContext';

const GarageDetail = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [similarGarages, setSimilarGarages] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const navigate = useNavigate();
  const { user, setIsLoginVisible } = useContext(AuthContext);


  const handleShowNumber = () => {
    setShowNumber(true);
  };

  const handleViewDetails = (garageId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/garages/${garageId}`);
  };

  useEffect(() => {
    // Fetch garage details
    axios.get(`http://localhost:9002/api/garages/${id}`)
      .then(response => {
        const data = response.data.data.data;
        setGarage(data);
        setPhotos(data.photos || []);
        setReviews(data.reviews || []);
      })
      .catch(error => console.error('Error fetching garage details:', error));

    // Fetch similar garages (excluding current one)
    axios.get(`http://localhost:9002/api/garages?exclude=${id}`)
      .then(response => {
        setSimilarGarages(response.data.data.data || []);
      })
      .catch(error => console.error('Error fetching similar garages:', error));
  }, [id]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(sectionId);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      await axios.post(`http://localhost:9002/api/garages/${id}/rate`, {
        rating: userRating,
        review: newReview
      });
      const response = await axios.get(`http://localhost:9002/api/garages/${id}`);
      setGarage(response.data.data.data);
      setReviews(response.data.data.data.reviews || []);
      setNewReview('');
      setUserRating(0);
      alert('Thank you for your review!');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (startIndex + itemsPerPage < similarGarages.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleSendPromotion = async (garageId) => {
    try {
      //   const user = JSON.parse(localStorage.getItem("user")) || 'Hi User'; // if login info is stored
      //   const phone = user?.phone || "+918461975062"; // fallback or prefilled number

      const response = await axios.post(`http://localhost:9002/api/garages/${garageId}/notify`, {
        // phone,
      });

      if (response.status === 200) {
        alert("Promotion sent via WhatsApp! ✅");
      } else {
        alert("Failed to send promotion ❌");
      }
    } catch (error) {
      console.error("Send WhatsApp Promotion Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const shareGarage = () => {
    if (navigator.share) {
      navigator.share({
        title: garage.name,
        text: `Check out ${garage.name} on our platform`,
        url: window.location.href,
      })
        .catch(error => console.log('Error sharing:', error));
    } else {
      const shareUrl = `mailto:?subject=${encodeURIComponent(garage.name)}&body=${encodeURIComponent(`Check out this garage: ${window.location.href}`)}`;
      window.location.href = shareUrl;
    }
  };

  if (!garage) return <div className="garage-container loading">Loading...</div>;

  return (
    <div className="garage-container">
      <div className="garage-breadcrumb">
        <Link to="/garageList">Garages</Link> / <span>{garage.name}</span>
      </div>

      <div className="garage-header-section">
        <div>
          <h1 className="garageDet-name">{garage.name}</h1>
          <div className="garageHead-rating">
            <span className="rating-badge">{garage.rating || '4.1'}★</span>
            <span> | {garage.ratingCount || '11.0'} Ratings | Claimed</span>
          </div>
          <div className="garage-subtext">
            {garage.address || 'No address'} - Open until 10:00 pm · {garage.yearsInBusiness || '15'} Years in Business
          </div>
          <div className="garage-action-buttons">
            <button
              onClick={() => {
                if (!user) {
                  setIsLoginVisible(true);
                }
              }}
              className="btn-show-number"
            >
              📞 {garage.contact
                ? user
                  ? garage.contact
                  : `xxxxxxx${garage.contact.slice(-3)}`
                : "N/A"}
            </button>

            <button className="btn-best-deal">Best Deal</button>
            <button
              className="whatsapp-btn"
              onClick={() => handleSendPromotion(garage._id)}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                style={{ width: '18px', height: '18px', marginRight: '6px', verticalAlign: 'middle' }}
              />
              Send Enquiry
            </button>
          </div>
        </div>
      </div>

      <div className="main-content-wrapper">
        <div className="left-content">
          <ul className="garage-tabs">
            <li
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => scrollToSection('overview')}
            >
              Overview
            </li>
            <li
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => scrollToSection('products')}
            >
              Products
            </li>
            <li
              className={activeTab === 'photos' ? 'active' : ''}
              onClick={() => scrollToSection('photos')}
            >
              Photos
            </li>
            <li
              className={activeTab === 'price-list' ? 'active' : ''}
              onClick={() => scrollToSection('price-list')}
            >
              Price List
            </li>
            <li
              className={activeTab === 'quick-info' ? 'active' : ''}
              onClick={() => scrollToSection('quick-info')}
            >
              Quick Info
            </li>
            <li
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => scrollToSection('reviews')}
            >
              Reviews
            </li>
          </ul>

          <div className="content-sections">
            {/* Overview Section */}
            <section id="overview" className="content-section">
              <h2>Overview</h2>
              <p>Welcome to {garage.name}. We provide quality service with {garage.yearsInBusiness || '25'} years of experience.</p>

              <div className="services-section">
                <h3>Services</h3>
                <ul className="services-list">
                  <li>General Repairs</li>
                  <li>Oil Changes</li>
                  <li>Tire Services</li>
                  <li>Brake Services</li>
                </ul>
              </div>
            </section>
            {/* Update the similar garages section in the return statement */}
            {similarGarages.length > 0 && (
              <section className="similar-garages">
                <h3>Similar Garages</h3>

                {/* <div className="arrow-controls">
                  <button onClick={handlePrev} disabled={startIndex === 0}>←</button>
                  <button onClick={handleNext} disabled={startIndex + itemsPerPage >= similarGarages.length}>→</button>
                </div> */}

                <div className="garages-scroll">
                  {similarGarages
                    .slice(startIndex, startIndex + itemsPerPage)
                    .map((garage) => (
                      <div
                        key={garage._id}
                        className="garageDet-card"
                        onClick={() => handleViewDetails(garage._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h4>{garage.name}</h4>
                        <img
                          src={
                            garage.photos[0] ||
                            "https://storage.googleapis.com/bkt-gobumper-prod-web-app-static/offers-imgs/car-repair"
                          }
                          className="img-fluid rounded-start garage-image"
                          alt={garage.name || "Garage"}
                        />
                        <div className="garage-rating">
                          {garage.rating || "4.0"}★ ({garage.ratingCount || "10"} Ratings)
                        </div>
                        <p className="garage-address">{garage.address || "No address"}</p>
                      </div>
                    ))}
                </div>
              </section>
            )}


            {/* Products Section */}
            <section id="products" className="content-section">
              <h2>Products</h2>
              <p>We’re excited to soon bring you a comprehensive list of products and services offered by this garage. From routine vehicle maintenance items to specialized repair tools and car care products, this section will showcase everything available to keep your vehicle in top condition.</p>
            </section>

            {/* Photos Section */}
            <section id="photos" className="content-section">
              <h2>Photos</h2>
              <div className="photo-gallery">
                {photos.length > 0 ? (
                  photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`Garage ${index}`} className="garage-photo" />
                  ))
                ) : (
                  <div className="no-photos">No photos available</div>
                )}
              </div>
              <label className="btn-upload">
                Upload Photos
                <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
              </label>
            </section>

            {/* Price List Section */}
            <section id="price-list" className="content-section">
              <h2>Price List</h2>
              <p>Price list content coming soon</p>
            </section>

            {/* Quick Info Section */}
            <section id="quick-info" className="content-section">
              <h2>Quick Info</h2>
              <p className="description">
                {garage.description || 'No description available.'}
                {garage.description && garage.description.length < 200 && (
                  <span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</span>
                )}
              </p>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="content-section">
              <h2>Reviews</h2>
              <div className="rating-input">
                <h3>Rate this garage</h3>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${(hoverRating || userRating) > i ? 'filled' : ''}`}
                      onClick={() => setUserRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {(hoverRating || userRating) > i ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <textarea
                  className="review-textarea"
                  placeholder="Write your review here..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button className="submit-review" onClick={handleRatingSubmit}>
                  Submit Review
                </button>
              </div>

              <div className="reviews-list">
                <h3>Customer Reviews</h3>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div className="review-header">
                        <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                        <span className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? 'filled' : ''}>
                              {i < review.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </span>
                      </div>
                      <p className="review-text">{review.text}</p>
                      <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review!</p>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Update the contact box section */}
        <div className="contact-box">
          <h4>Contact</h4>
          <button className="btn-contact">
            <span className="icon">📞</span>
            Show Number
          </button>
          <div className="address-section">
            <div className="address-header">
              <span className="icon">📍</span>
              <span>Address</span>
              <button className="btn-copy">Copy</button>
            </div>
            <p className="address-text">
              Ground Floor, No.2, Near Oxford School,<br />
              Gb Palya Road, Hongasandra-560068
            </p>
          </div>
          <button className="btn-get-directions">Get Directions</button>
          <div className="timing-section">
            <span className="open-status">Open until 10:00 pm</span>
            <button className="btn-suggest">Suggest New Timings</button>
          </div>
          <div className="contact-actions">
            <button className="btn-contact-action">Get info via SMS/Email</button>
            <button className="btn-contact-action">Share</button>
            <button className="btn-contact-action">Tap to rate</button>
            <button className="btn-contact-action">Edit this Listing</button>
            <button className="btn-contact-action">Add Website</button>
          </div>
          <div className="also-listed">
            <h5>Also listed in</h5>
            <div className="listed-items">
              <span>• Auto Repair Shops</span>
              <span>• Car Services</span>
              <span>• Vehicle Inspection Centers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageDetail;