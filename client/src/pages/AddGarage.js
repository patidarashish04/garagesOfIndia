import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styles/AddGarage.css"; // Import CSS file

const AddGarage = ({ show, handleClose, handleAddGarage }) => {
  const [garageData, setGarageData] = useState({
    name: "",
    address: "",
    description: "",
    vehicleTypes: "",
    services: "",
    verified: false,
    location: "",
    contact: "",
    photos: [],
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGarageData({
      ...garageData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle File Upload (Max 4 Photos)
  const handleFileChange = (e) => {
    if (e.target.files.length > 4) {
      alert("You can upload a maximum of 4 photos.");
      return;
    }
    setGarageData({ ...garageData, photos: e.target.files });
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddGarage(garageData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Garage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" required onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" required onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Photos (Max 4)</Form.Label>
            <Form.Control type="file" name="photos" multiple accept="image/*" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" required onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Select name="vehicleTypes" required onChange={handleChange}>
              <option value="">Select</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Services</Form.Label>
            <Form.Control type="text" name="services" required onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" required onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" name="contact" required onChange={handleChange} />
          </Form.Group>

          <Form.Group className="d-flex align-items-center mt-2">
            <Form.Label className="me-2">Verified</Form.Label>
            <Form.Check type="checkbox" name="verified" onChange={handleChange} />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary" className="ms-2">Add Garage</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddGarage;
