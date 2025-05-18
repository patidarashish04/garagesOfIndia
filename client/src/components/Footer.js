// Footer.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faLinkedinIn,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import "../styles/Footer.css";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Information */}
        <div className="footer-section">
          <h4 id="contact" className="text-center font-bold text-2xl my-8">
            Contact Us
          </h4>
          <p>11/22 First Floor, Old Madiwala City</p>
          <p>Email: support@garagesofindia.com</p>
          <p>Phone: +917987921029</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Legal Information */}
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Keep in touch</h3>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section">
          <h4>Subscribe</h4>
          <p>Stay updated with our latest news and offers.</p>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TechCorp. All rights reserved.</p>
        <ul>
          <li><a href="/accessibility">Accessibility</a></li>
          <li><a href="/sitemap">Sitemap</a></li>
          <li><a href="/help">Help & Support</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
