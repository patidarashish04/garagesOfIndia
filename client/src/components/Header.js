import React, { useState, useRef, useContext } from 'react';
import '../styles/Header.css';
import Register from '../pages/Register';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';
import userIcon from '../assets/profile-user.png';
import garageIcon from '../assets/garage-icon.png';
import LocationSelector from "../components/LocationSelector";
import LocationModal from "../components/LocationSelector";
import { FaMapMarkerAlt } from "react-icons/fa";

const Header = () => {
  const {
    user,
    isLoginVisible,
    setIsLoginVisible,
    handleLoginSuccess,
    handleLogout,
  } = useContext(AuthContext);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState("Bangalore");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);

  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => setIsPopupVisible(true);
  const handleMouseLeave = () => setIsPopupVisible(false);

  const openRegistration = () => {
    setIsLoginVisible(false);
    setIsPopupVisible(false);
    setIsRoleModalVisible(true);
  };

  const handleUserLogin = () => {
    window.location.href = "/UserLogin"
  };

  const handleClick = () => {
    window.location.href = "/GarageRegistration"
  };

  const openLogin = () => {
    setIsLoginVisible(true);
    setIsRegistrationVisible(false);
    setIsPopupVisible(false);
  };

  const closeRegistration = () => setIsRegistrationVisible(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="header-logo">
        <img src={garageIcon} alt="Garage Icon" />
        <h1>Garage Of India</h1>
      </div>

      {/* Location Selector */}
      <button className="location-button" onClick={() => setIsModalOpen(true)}>
        <span className="location-icon">
          <FaMapMarkerAlt />
        </span>
        <span className="location-text">{currentCity}</span>
      </button>
      {isModalOpen && (
        <LocationModal
          closeModal={() => setIsModalOpen(false)}
          setCurrentCity={setCurrentCity}
        />
      )}

      {isLocationModalOpen && (
        <LocationSelector
          onClose={() => setIsLocationModalOpen(false)}
          onSelectLocation={handleLocationSelect}
        />
      )}

      {/* Navigation Menu */}
      <nav className="header-center">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#services" className="nav-link">Services</a></li>
          <li><a href="#garages" className="nav-link">Garages</a></li>
          <li><a href="#blogs" className="nav-link">Blogs</a></li>
          <li><a href="#reviews" className="nav-link">Reviews</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      {/* Account Section */}
      <div
        className="header-account"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="account-info" ref={popupRef}>
          <div className="account-icon-container" onClick={togglePopup}>
            <img src={userIcon} alt="User Icon" className="user-icon" />
            <div className="account-text">
              {user ? (
                <>
                  <span className="hello-message">Hello, {user.name || 'User'}</span>
                  <span className="account-dropdown">Account ▼</span>
                </>
              ) : (
                <>
                  <span className="hello-message">Hello, Sign In</span>
                  <span className="account-dropdown">Account ▼</span>
                </>
              )}
            </div>
          </div>

          {isPopupVisible && (
            <div className="account-popup">
              {user ? (
                <>
                  <button onClick={handleLogout} className="popup-button">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={openLogin} className="popup-button">Log In</button>
                  <button onClick={openRegistration} className="popup-button">Sign Up</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {isRegistrationVisible && (
        <div className="registration-modal">
          <div className="modal-content">
            <button onClick={closeRegistration} className="close-modal-button">
              &times;
            </button>
            <Register />
          </div>
        </div>
      )}

      {/* Role Selection Modal */}
      {isRoleModalVisible && (
        <div className="role-modal">
          <div className="modal-content">
            <button onClick={() => setIsRoleModalVisible(false)} className="close-modal-button">&times;</button>
            <h3>Register as:</h3>
            <button
              className="role-button"
              onClick={() => {
                window.location.href = "/UserLogin";
                setIsRoleModalVisible(false);
              }}
            >
              Customer
            </button>
            <button
              className="role-button"
              onClick={() => {
                window.location.href = "/GarageRegistration"
                setIsRoleModalVisible(false);
              }}
            >
              Garage Owner
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginVisible && (
        <div className="login-modal">
          <div className="modal-content">
            <Login
              onLoginSuccess={handleLoginSuccess}
              onClose={() => setIsLoginVisible(false)}
            />
          </div>
        </div>
      )}

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
};

export default Header;
