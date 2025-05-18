import React, { useState,useEffect,useRef } from "react";
import '../styles/Garage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const GarageForm = () => {
  const [garageData, setGarageData] = useState({
    name: "",
    description: "",
    location: "",
    rating: 0,
    contact: "",
    vehicleTypes: [],
    photos: [],
    latitude:"",
    longitude:""

  });

  const [userLocation, setUserLocation] = useState(null);
  const [errors, setErrors] = useState({});
  //otp button for one click only
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  //for otp
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  useEffect(()=>{
    if(inputRefs.current[0]){
      inputRefs.current[0].focus();
    } 
  },[isVerifying])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGarageData({ ...garageData, [name]: value });
  };

  const handleVehicleTypeChange = (e) => {
    const { value, checked } = e.target;
    let updatedTypes = [...garageData.vehicleTypes];
    if (checked) {
      updatedTypes.push(value);
    } else {
      updatedTypes = updatedTypes.filter((type) => type !== value);
    }
    setGarageData({ ...garageData, vehicleTypes: updatedTypes });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 4) {
      setGarageData({ ...garageData, photos: files });
    } else {
      alert("You can upload a maximum of 4 photos.");
      e.target.value = null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ask for location permission when form is submitted
    const confirmLocation = window.confirm("This app needs your location to add the garage. Allow access?");
    if (!confirmLocation) return;
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
  
          const payload = {
            name: garageData.name,
            description: garageData.description,
            address: garageData.location,
            contact: `+91${garageData.contact}`,
            location: {
              type: "Point",
              coordinates: [
                parseFloat(latitude), 
                parseFloat(longitude)
              ]
            },
            vehicleTypes:garageData.vehicleTypes,
            photos :["https://fastly.picsum.photos/id/777/250/250.jpg?hmac=nqSh8p2OltjDJOw6NEDEj1rsgI9BGtFBrTN5mDxOmmY"]
          };
          
        
  
          // Validate fields
          const newErrors = {};
          if (!garageData.name.trim()) newErrors.name = "Garage Name is required";
          if (!garageData.description.trim()) newErrors.description = "Description is required";
          if (!garageData.location.trim()) newErrors.location = "Location is required";
          if (!garageData.contact.trim()) newErrors.contact = "Contact is required";
          if (garageData.vehicleTypes.length === 0) newErrors.vehicleTypes = "At least one vehicle type must be selected";
          if (garageData.photos.length === 0) newErrors.photos = "Please upload at least one photo";
  
          setErrors(newErrors);
          if (Object.keys(newErrors).length === 0) {
            try {
              const response = await axios.post("http://localhost:9002/api/garages", payload, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log("Garage created successfully:", response.data);
              alert("Garage added successfully!");
              navigate("/");
              
            } catch (error) {
              console.error("Error creating garage:", error);
              alert("Failed to add garage.");
            }
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Location access is required to add a garage.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  

  const handleShowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  //otp handling

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Allow only digits
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    // Move to next box if digit entered
    if (value && index < 4 && inputRefs.current[index+1]) {
      // const nextInput = document.querySelector(`#otp-input-${index + 1}`);
      // if (nextInput) nextInput.focus();

      inputRefs.current[index+1].focus();
    }
  };
  
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index-1]) {
      // const prevInput = document.querySelector(`#otp-input-${index - 1}`);
      // if (prevInput) prevInput.focus();
      inputRefs.current[index-1].focus()
    }
  };

  //for verifying the otp

   const handleVerifyClick = async() =>{
  console.log("Verify button clicked");
  try{
    const response = await axios.post("http://localhost:9002/api/users/request-otp", {
      phone: `+91${garageData.contact}`
    });
    if (response.status === 200) {
      console.log("OTP sent successfully:", response.data);
      alert("OTP sent successfully!");
      setIsVerifying(true);
    } else {
      alert("Failed to send OTP. Please try again.");
      console.error("Failed to send OTP:", response.data);
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    alert("Something went wrong while sending OTP.");
  }
  };

  const handleOtpVerify = async () => {
  const enteredOtp = otp.join(""); // Join the array to get full OTP

  if (enteredOtp.length !== 5) {
    alert("Please enter the complete 5-digit OTP.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:9002/api/users/verify-otp", {
      phone: `+91${garageData.contact}`,
      otp: enteredOtp
    });

    if (response.status === 200) {
      alert("OTP verified successfully!");
      console.log("OTP verified:", response.data);
      setIsOtpVerified(true);
      setIsVerifying(false);
    } else {
      alert("OTP verification failed.");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert("Something went wrong while verifying OTP.");
  }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Garage</h2>

      <div>
        <label>Garage Name:</label>
        <input
          type="text"
          name="name"
          value={garageData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={garageData.description}
          onChange={handleInputChange}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div>
        <label>Address:</label>
        <input
          type="text"
          name="location"
          value={garageData.location}
          onChange={handleInputChange}
        />
        {errors.location && <span className="error">{errors.location}</span>}
      </div>

      {/* <div>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={garageData.rating}
          onChange={handleInputChange}
          min="0"
          max="5"
        />
      </div> */}

      {/* <div>
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={garageData.contact}
          onChange={handleInputChange}
        />
        {errors.contact && <span className="error">{errors.contact}</span>}
      </div> */}


 <div className="contact-wrapper">
  <label>Contact:</label>

  <div className="contact-row">
    <div className="contact-input-box">
      <span className="country-code">+91</span>
      <input
        type="text"
        name="contact"
        value={garageData.contact}
        placeholder="Enter mobile number"
        disabled={isOtpVerified}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d{0,10}$/.test(value)) {
            setGarageData({ ...garageData, contact: value });
          }
        }}
      />
    </div>


   

    
    <button
      type="button"
      onClick={handleVerifyClick}
      className="Get-Otp-btn"
      disabled={garageData.contact.length !== 10 || isOtpVerified}
    >
      Get OTP
    </button>
  </div>

  {isVerifying && (
    <div className="otp-box">
      <span>Enter OTP</span>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(e, index)}
          onKeyDown={(e) => handleOtpKeyDown(e, index)}
        />
      ))}
      <button type="button" className="verify-otp-btn" onClick={handleOtpVerify}>
        Verify OTP
      </button>
    </div>
  )}
  </div>
  {errors.contact && <span className="error">{errors.contact}</span>}

  



      
  {/* <button type="button"  onClick={handleVerifyClick} className="verify-btn"  disabled={garageData.contact.length !== 10}>
    Get OTP
  </button>
  {isVerifying && (
    <div className="otp-box">
      <>Enter OTP</>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          ref={(input)=>inputRefs.current[index] = input}
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(e, index)}
          onKeyDown={(e) => handleOtpKeyDown(e, index)}
        />
      ))} 
    </div>
  )} */}


      <div>
        <label>Vehicle Types:</label><br />
        <label>
          <input
            type="checkbox"
            value="Car"
            checked={garageData.vehicleTypes.includes("Car")}
            onChange={handleVehicleTypeChange}
          />
          Car
        </label>
        <label>
          <input
            type="checkbox"
            value="Bike"
            checked={garageData.vehicleTypes.includes("Bike")}
            onChange={handleVehicleTypeChange}
          />
          Bike
        </label>
        {errors.vehicleTypes && <span className="error">{errors.vehicleTypes}</span>}
      </div>

      <div>
        <label>Photos (max 4):</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {errors.photos && <span className="error">{errors.photos}</span>}
      </div>

     


      <button type="submit">Add Garage</button>
      <br />
      {/* <button type="button" className="geo-btn" onClick={handleShowLocation}>
        Show User Location
      </button>

      {userLocation && (
        <p className="showDetails">
          Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
        </p>
      )} */}
    </form>
  );
};

export default GarageForm;
