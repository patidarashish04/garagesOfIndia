import React from "react";
import "../styles/DetailPage.css"; // Use your CSS or Tailwind as needed
import sampleImage from "../assets/EssentialServicePackage.jpeg"; // Replace with actual image

const DetailPage = () => {
  return (
    <div className="detail-page-container">
      {/* Top Navbar */}
      <div className="navbar">
        <div className="nav-item">Home</div>
        <div className="nav-item active">Auto Insider</div>
        <div className="nav-item">Reviews</div>
      </div>

      {/* Main Content */}
      <div className="main-content-wrapper">
        {/* Sidebar Outline */}
        <aside className="sidebar">
          <h3>Outline</h3>
          <ul>
            <li>New Kia Carens Clavis variants</li>
            <li>HTE features</li>
            <li>HTE (O) features</li>
            <li>HTK features</li>
            <li>HTX features</li>
          </ul>
        </aside>

        {/* Main Article */}
        <main className="article">
          <h1>Key Highlights</h1>
          <div className="highlight-grid">
            <div>
              <h2>1</h2>
              <p>ESC, parking sensors, ISOFIX mounts standard</p>
            </div>
            <div>
              <h2>2</h2>
              <p>Top variant gets captain seats</p>
            </div>
            <div>
              <h2>3</h2>
              <p>Seven trims across powertrains</p>
            </div>
          </div>

          <div className="author-section">
            <img src="https://via.placeholder.com/40" alt="Author" />
            <div>
              <strong>Aryan Aggarwal</strong>
              <p>New Delhi</p>
            </div>
          </div>

          <div className="article-text">
            <p>
              The <a href="#">Kia Carens Clavis</a> is the newest Kia car in India...
            </p>
            <h2>New Kia Carens Clavis variants</h2>
            <img src={sampleImage} alt="Car" className="article-image" />
            {/* More sections... */}
          </div>
        </main>

        {/* Ad Banner */}
        {/* <aside className="ad-banner">
          <img src="/path-to-ad.jpg" alt="Ad" />
        </aside> */}
      </div>
    </div>
  );
};

export default DetailPage;
