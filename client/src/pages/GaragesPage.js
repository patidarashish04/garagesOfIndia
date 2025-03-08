import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/GaragesPage.css";
import AddGarage from "../pages/AddGarage";


const GaragesPage = () => {
  const [garages, setGarages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch garages
  useEffect(() => {
    axios
      .get("http://localhost:9002/api/garages")
      .then((res) => {
        let result = res.data.data.data;
        result = result?.map(item => {
          let reviews = item?.reviews;
          let overAllRating = {
            totalRating : reviews.length,
            averageRating : 0,
            MaxRating : 5
          };
          let sumofRatings = 0;
          reviews?.forEach(element => {
            sumofRatings += isNaN(element.rating) ? 0 : element.rating;
          });
          overAllRating.averageRating = sumofRatings > 0 ? sumofRatings / overAllRating.totalRating : 0;
          return {... item, overAllRating : overAllRating};
        })
        
        setGarages(result);
      }) // Adjusted based on response
      .catch((err) => console.error(err));
  }, []);

  // Delete a garage
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9002/api/garages/${id}`)
      .then(() => {
        setGarages(garages.filter((garage) => garage._id !== id)); // Update state after deletion
        alert("Garage deleted successfully.");
      })
      .catch((err) => console.error(err));
  };


  const handleAddGarage = async (garageData) => {
    console.log(garageData); 
  };

  // Add a garage (simplified, should ideally show a form modal)
  // const handleAdd = () => {
  //   const newGarage = {
  //     name: "New Garage",
  //     address: "New Address",
  //     contact: "+910000022000",
  //     description: "A newly added garage.",
  //     vehicleTypes: ["Bike"],
  //     photos: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s",
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s"],
  //   };
  //   axios
  //     .post("http://localhost:9002/api/garages", newGarage)
  //     .then((res) => {
  //       setGarages([...garages, res.data.data]); // Add the new garage to state
  //       alert("Garage added successfully.");
  //     })
  //     .catch((err) => console.error(err));
  // };

  const handleAdd = (garageData) => {
    const formData = new FormData();
    console.log('=====formData>>>', formData)
  
    // Append text fields
    Object.keys(garageData).forEach((key) => {
      console.log('=====garageData>>>', garageData)

      if (key !== "photos") {
        console.log('=====photos>>>', key)
        formData.append(key, garageData[key]);
      }
    });
  
    // Append photos (if available)
    // if (garageData.photo.length > 0) {
    //   Array.from(garageData.photos).forEach((photo) => {
    //     formData.append("photos", photo);
    //   });
    // }
  
    // Send data to backend
    axios
      .post("http://localhost:9002/api/garages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log('===res.data.data==>>>', res.data.data)
        setGarages([...garages, res.data.data]); // Add new garage to state
        alert("Garage added successfully.");
      })
      .catch((err) => console.error(err));
  };
  

  // Update a garage (simplified, should ideally show a form modal)
  const handleUpdate = (id) => {
    const updatedGarage = {
      name: "Updated Garage",
      address: "Updated Address",
      contact: "+919990099999",
      description: "This garage has been updated.",
      vehicleTypes: ["Car"],
      photos: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNpHHexZEaEdqjOYor55zJw2AdMRW1T745dA&s"
    ],
    };
    axios
      .patch(`http://localhost:9002/api/garages/${id}`, updatedGarage)
      .then(() => {
        setGarages(
          garages.map((garage) =>
            garage._id === id ? { ...garage, ...updatedGarage } : garage
          )
        ); // Update the state with the updated garage
        alert("Garage updated successfully.");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
    <h1 className="garage-list-main text-center">Garages List</h1>
    
    {/* <div className="d-flex justify-content-end mb-3">
      <button className="btn btn-primary btn-sm" onClick={handleAdd}>
        Add Garage
      </button>
    </div> */}
    <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary btn-sm" onClick={() => handleAdd(true)}>
          Add Garage
        </button>
      </div>

      <AddGarage show={showModal} handleClose={() => setShowModal(false)} handleAddGarage={handleAddGarage} />
      {garages.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Description</th>
              <th>Vehicle Types</th>
              <th>Reviews</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {garages.map((garage, index) => (
              <tr key={garage._id}>
                <td>{index+1}</td>
                <td>{garage.name}</td>
                <td>{garage.address}</td>
                <td>{garage.contact}</td>
                <td>{garage.description}</td>
                <td>{garage.vehicleTypes}</td>
                <td>{garage.overAllRating.averageRating || 0}</td>
                <td>
                  {garage.photos.length > 0 ? (
                    garage.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Garage ${index + 1}`}
                        className="img-thumbnail me-2"
                        style={{ width: "60px", height: "60px" }}
                      />
                    ))
                  ) : (
                    <span>No photos</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdate(garage._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(garage._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info">No garages found.</div>
      )}
    </div>
  );
};

export default GaragesPage;
