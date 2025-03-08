import React, { useState } from "react";
import axios from 'axios'; 
import "../styles/Registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("All fields are required");
      return;
    }
    try {
      const response = await axios.post('http://localhost:9002/api/users/signup', formData);
      setMessage(response.data.message);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setMessage("Email already exists. Please use a different email.");
        } else {
          setMessage(err.response.data.message || 'An error occurred');
        }
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="registration-container">
      <h2 className="title">User Registration</h2>
      {message && <p className="success-message">{message}</p>}
      <form className="registration-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
