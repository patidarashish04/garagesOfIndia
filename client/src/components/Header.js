import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import Register from '../pages/Register';
import Login from '../pages/Login';
import userIcon from '../assets/profile-user.png';
import garageIcon from '../assets/garage-icon.png';
import menuIcon from '../assets/ic_hamburger.svg';
import LocationSelector from "../components/LocationSelector";
import LocationModal from "../components/LocationSelector";
import { FaMapMarkerAlt } from "react-icons/fa";

// import { Navbar, Nav, Container, Button, Form, FormControl } from "react-bootstrap";


const Header = () => {
  const [user, setUser] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState("Bangalore");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  // Simulate fetching user data (replace with actual API call if needed)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = () => setIsPopupVisible(true);
  const handleMouseLeave = () => setIsPopupVisible(false);

  const openRegistration = () => {
    setIsRegistrationVisible(true);
    setIsLoginVisible(false);
    setIsPopupVisible(false);
  };

   
const handleUserLogin = () =>{
  window.location.href = "/UserLogin"
};

  const handleClick = () => {
   window.location.href =  "/GarageRegistration"
  };


    // const [isGaragesFormOpen, setIsGaragesFormOpen] = useState(false);

  const openLogin = () => {
    setIsLoginVisible(true);
    setIsRegistrationVisible(false);
    setIsPopupVisible(false);
  };

  const closeRegistration = () => setIsRegistrationVisible(false);
  const closeLogin = () => setIsLoginVisible(false);

  const handleLoginSuccess = (loggedInUser) => {
    console.log(loggedInUser)
    setUser(loggedInUser); // Update the `user` state in Header
    setIsLoginVisible(false); // Close the login modal
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Save location to the backend or state management here
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
        <button onClick = {handleClick}>Garage Registration</button>
        <button onClick = {handleUserLogin}> Login</button>
        

        {/* {isGaragesFormOpen && (
        <div className="garages-modal">
          <button className="close-button" onClick={() => setIsGaragesFormOpen(false)}>Close</button>
          <Garages />
        </div>
      )} */}
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
          <li><a href="/sell-car">Services</a></li>
          <li><a href="/finance">Car Garages</a></li>
          <li><a href="/services">Bike Garages</a></li>
          <li><a href="/new-cars">Reviews</a></li>
          <li><a href="/rto-check">Contact</a></li>
        </ul>
      </nav>

      {/* <Form className="d-flex me-2">
            <FormControl type="search" placeholder="Search garages..." className="me-2" />
            <Button variant="outline-light">Search</Button>
          </Form> */}

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
              <span className="hello-message">Hello, {user.name}</span>
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

      {/* Login Modal */}
      {isLoginVisible && (
        <div className="login-modal">
          <div className="modal-content">
            <button onClick={closeLogin} className="close-modal-button">
              &times;
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
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
