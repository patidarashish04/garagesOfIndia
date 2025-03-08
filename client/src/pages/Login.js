import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9002/api/users/login",
        formData
      );
      console.log(response.data.data.user); // Check what the API is returning

      if (response.data.status) {
        // Save the user data in localStorage and pass it to the parent component
        const loggedInUser = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        console.log(localStorage.getItem("user"));

        setMessage("Login successful!");

        // Notify the parent component about the login success
        if (onLoginSuccess) {
          onLoginSuccess(loggedInUser);
        }
      } else {
        setMessage(response.data.data.message || "Login failed.");
      }
    } catch (err) {
      if (err.response) {
        setMessage(
          err.response.data.data.message || "Login failed. Please check your credentials."
        );
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">User Login</h2>
      {message && <p className={message.includes("successful") ? "success-message" : "error-message"}>{message}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
