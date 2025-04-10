import React, { useState } from "react";
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
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGarageData({ ...garageData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", garageData.name);
        formData.append("description", garageData.description);
        formData.append("location", garageData.location);
        formData.append("rating", garageData.rating);
        formData.append("contact", garageData.contact);

        // garageData.vehicleTypes.forEach((type) => {
        //     formData.append("vehicleTypes", JSON.stringify(garageData.vehicleTypes)); // or use JSON.stringify if backend expects array
        // });

        // garageData.photos.forEach((photo) => {
        //     formData.append("photos", photo);
        // });

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
    };


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setGarageData((prevState) => {
            const updatedTypes = checked
                ? [...prevState.vehicleTypes, value]
                : prevState.vehicleTypes.filter((type) => type !== value);
            return { ...prevState, vehicleTypes: updatedTypes };
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4); // max 4 files
        setGarageData({ ...garageData, photos: files });
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Garage</h2>

            <div>
                <label>Garage Name:</label>
                <input type="text" name="name" value={garageData.name} onChange={handleInputChange} required />
            </div>

            <div>
                <label>Description:</label>
                <textarea name="description" value={garageData.description} onChange={handleInputChange} required />
            </div>

            <div>
                <label>Location:</label>
                <input type="text" name="location" value={garageData.location} onChange={handleInputChange} required />
            </div>

            <div>
                <label>Rating:</label>
                <input type="number" name="rating" value={garageData.rating} onChange={handleInputChange} min="0" max="5" required />
            </div>

            <div>
                <label>Contact:</label>
                <input type="text" name="contact" value={garageData.contact} onChange={handleInputChange} required />
            </div>

            <div>
                <label>Vehicle Types:</label>
                <label>
                    <input type="checkbox" value="Car" onChange={handleCheckboxChange} />
                    Car
                </label>
                <label>
                    <input type="checkbox" value="Bike" onChange={handleCheckboxChange} />
                    Bike
                </label>
            </div>

            <div>
                <label>Photos (max 4):</label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
            </div>

            <button type="submit">Add Garage</button>
        </form>
    );
};

export default GarageForm;
