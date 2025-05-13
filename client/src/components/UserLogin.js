import { useState, useRef } from "react";
// import "../styles/UserLogin.css";
import "../styles/Garage.css"
import axios from "axios";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    userName: "",
    location: "",
    contact: "",
    vehicleTypes: [],
    email: "",
  });

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleVehicleTypeChange = (e) => {
    const { value, checked } = e.target;
    let updatedTypes = [...userData.vehicleTypes];
    if (checked) {
      updatedTypes.push(value);
    } else {
      updatedTypes = updatedTypes.filter((type) => type !== value);
    }
    setUserData({ ...userData, vehicleTypes: updatedTypes });
  };

  // OTP Verification
  const handleVerifyClick = async () => {
    console.log("Verify button clicked");
    try {
      const response = await axios.post("http://localhost:9002/api/users/request-otp", {
        phone: `+91${userData.contact}`, 
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

  // OTP handling
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input box if a digit is entered
    if (value && index < 4 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace in OTP input
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
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
        phone: `+91${userData.contact}`,
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

  // Form data handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      alert("Please verify your OTP before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", userData.userName);
    formData.append("location", userData.location);
    userData.vehicleTypes.forEach((type) => {
      formData.append("vehicleTypes[]", type);
    });
    formData.append("email", userData.email);
    formData.append("contact", `+91${userData.contact}`);

    // Validate fields
    const newErrors = {};
    if (!userData.userName.trim()) newErrors.userName = "User Name is required";
    // if (!userData.location.trim()) newErrors.location = "Location is required";
    // if (!userData.contact.trim()) newErrors.contact = "Contact is required";
    if (!userData.email.trim()) newErrors.email = "Email is required";
    if (userData.vehicleTypes.length === 0) newErrors.vehicleTypes = "At least one vehicle type must be selected";


    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:9002/api/users/signup", formData);
        console.log("User Added successfully:", response.data);
        alert("User added successfully!");
        // navigate("/"); // Uncomment if you have navigation logic
      } catch (error) {
        console.error("Error in adding User:", error);
        alert("Failed to add User.");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h1>User Login</h1>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
        />
        {errors.userName && <span className="error">{errors.userName}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="contact-wrapper">
        <label>Contact:</label>
        <div className="contact-row">
          <div className="contact-input-box">
            <span className="country-code">+91</span>
            <input
              type="text"
              name="contact"
              value={userData.contact}
              placeholder="Enter mobile number"
              disabled={isOtpVerified}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setUserData({ ...userData, contact: value });
                }
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleVerifyClick}
            className="Get-Otp-btn"
            disabled={userData.contact.length !== 10 || isOtpVerified}
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

      <div>
        <label>Vehicle Types:</label><br />
        <label>
          <input
            type="checkbox"
            value="Car"
            checked={userData.vehicleTypes.includes("Car")}
            onChange={handleVehicleTypeChange}
          />
          Car
        </label>
        <label>
          <input
            type="checkbox"
            value="Bike"
            checked={userData.vehicleTypes.includes("Bike")}
            onChange={handleVehicleTypeChange}
          />
          Bike
        </label>
        {errors.vehicleTypes && <span className="error">{errors.vehicleTypes}</span>}
      </div>

      <label htmlFor="address">Address</label>
      <input type="text" placeholder="Enter Address (optional)" name="address" />

      <button type="submit">Add User</button>
    </form>
  );
};

export default LoginForm;
