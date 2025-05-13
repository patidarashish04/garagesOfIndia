import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import loginPopImage from "../assets/loginpopImage.jpg";

const Login = ({ onLoginSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });

  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Phone, Step 2: OTP

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestOtp = async () => {
    if (!formData.phone) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      await axios.post("http://localhost:9002/api/users/request-otp", {
        phone: formData.phone,
      });

      setMessage("OTP sent successfully!");
      setStep(2);
    } catch (err) {
      setMessage("Failed to send OTP. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.otp) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9002/api/users/verify-otp", formData);
      if (response.data.token) {
        const user = { phone: formData.phone, token: response.data.token };
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Login successful!");

        if (onLoginSuccess) onLoginSuccess(user);
      } else {
        setMessage(response.data.message || "Invalid OTP.");
      }
    } catch (err) {
      setMessage("Error verifying OTP. Try again.");
    }
  };

  return (
    <div className="loginPage-modal-background">
      <div className="loginPage-modal">
        {/* Close Button */}
        <button className="login-close-button" onClick={onClose}>
          &times;
        </button>

        {/* Left Image Side */}
        <div className="loginPage-modal-left">
          <img src={loginPopImage} alt="Avatar" className="login-image" />
        </div>

        {/* Right Form Side */}
        <div className="loginPage-modal-right">
          <h2 className="login-title">Log in to continue</h2>

          {message && (
            <p className={message.includes("successful") ? "success-message" : "error-message"}>
              {message}
            </p>
          )}

          <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="login-form">
            <label className="form-label">Mobile number:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 - Mobile Number"
              required
            />

            {step === 2 && (
              <>
                <label className="form-label">Enter OTP:</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter OTP"
                  required
                />
              </>
            )}

            {step === 1 ? (
              <button type="button" className="get-otp-button" onClick={requestOtp}>
                GET OTP
              </button>
            ) : (
              <button type="submit" className="get-otp-button">
                VERIFY & LOGIN
              </button>
            )}
          </form>

          <p className="terms-text">
            By logging in, you agree to our <a href="#">Terms & Conditions</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
