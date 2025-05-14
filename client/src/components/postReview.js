import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/postReview.css';

const postReviewSection = () => {
  const [postReviews, setpostReviews] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9002/api/postReview')
      .then((response) => setpostReviews(response.data.data.data))
      .catch((error) => console.error('Error fetching postReviews:', error));
  }, []);

  return (
    <section className="postReview-section">
      <h2 id="reviews" className="text-center font-bold text-2xl my-8">
        What our customers say
      </h2>
      <div className="postReview-container">
        {postReviews.map((postReview) => (
          <div key={postReview._id} className="postReview-card">
            <div className="quote-mark">“</div>
            <img
              src={postReview.imageUrl}
              alt={postReview.name}
              className="postReview-image"
            />
            <p className="postReview-feedback">{postReview.feedback}</p>
            <div className="postReview-info">
              <div className="postReview-header">
                <div className="postReview-rating">
                  {Array(postReview.rating)
                    .fill("⭐")
                    .map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                </div>
                <div className="postReview-date">{postReview.date}</div>
              </div>
              <div className="postReview-name">{postReview.name}</div>
              <div className="postReview-car">{postReview.car}</div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default postReviewSection;
