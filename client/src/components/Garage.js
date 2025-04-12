import React, { useState,useEffect,useRef } from "react";
import '../styles/Garage.css';
import axios from "axios";

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

  //for otp
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
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

  // const handleSubmit = async(e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //       formData.append("name", garageData.name);
  //       formData.append("description", garageData.description);
  //       formData.append("location", garageData.location);
  //       formData.append("rating", garageData.rating);
  //       formData.append("contact", garageData.contact);
        
  //       console.log("Latitude"+ userLocation.latitude);
  //       console.log("Longitude"+ userLocation.longitude);
  //       formData.append("longitude",userLocation.longitude);
  //       formData.append("latitude", userLocation.latitude);

  //   const newErrors = {};

  //   if (!garageData.name.trim()) newErrors.name = "Garage Name is required";
  //   if (!garageData.description.trim()) newErrors.description = "Description is required";
  //   if (!garageData.location.trim()) newErrors.location = "Location is required";
  //   if (!garageData.contact.trim()) newErrors.contact = "Contact is required";
  //   if (garageData.vehicleTypes.length === 0) newErrors.vehicleTypes = "At least one vehicle type must be selected";
  //   if (garageData.photos.length === 0) newErrors.photos = "Please upload at least one photo";

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     try {
  //       const response = await axios.post("http://localhost:9002/api/garages", formData, {
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //       });
  //       console.log("Garage created successfully:", response.data);
  //       alert("Garage added successfully!");
  //   } catch (error) {
  //       console.error("Error creating garage:", error);
  //       alert("Failed to add garage.");
  //   }
      
  //   }
  // };

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
  
          const formData = new FormData();
          formData.append("name", garageData.name);
          formData.append("description", garageData.description);
          formData.append("location", garageData.location);
          formData.append("rating", garageData.rating);
          formData.append("contact", garageData.contact);
          formData.append("latitude", latitude);
          formData.append("longitude", longitude);
  
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
              const response = await axios.post("http://localhost:9002/api/garages", formData, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              console.log("Garage created successfully:", response.data);
              alert("Garage added successfully!");
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
    if (value && index < 3 && inputRefs.current[index+1]) {
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
  <div className="contact-input-box">
    <span className="country-code">+91</span>
    <input
      type="text"
      name="contact"
      value={garageData.contact}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
          setGarageData({ ...garageData, contact: value });
        }
      }}
    />
  </div>
  {errors.contact && <span className="error">{errors.contact}</span>}

  <button type="button" onClick={() => setIsVerifying(true) } className="verify-btn"  disabled={garageData.contact.length !== 10}>
    Verify Number
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
  )}
</div>

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
