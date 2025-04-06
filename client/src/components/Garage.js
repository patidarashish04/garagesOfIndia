// import React, { useState } from "react";
// import '../styles/Garage.css';

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setGarageData({ ...garageData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add submission logic here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create Garage</h2>

//       <div>
//         <label>Garage Name:</label>
//         <input type="text" name="name" value={garageData.name} onChange={handleInputChange} required />
//       </div>

//       <div>
//         <label>Description:</label>
//         <textarea name="description" value={garageData.description} onChange={handleInputChange} required />
//       </div>

//       <div>
//         <label>Location:</label>
//         <input type="text" name="location" value={garageData.location} onChange={handleInputChange} required />
//       </div>

//       <div>
//         <label>Rating:</label>
//         <input type="number" name="rating" value={garageData.rating} onChange={handleInputChange} min="0" max="5" required />
//       </div>

//       <div>
//         <label>Contact:</label>
//         <input type="text" name="contact" value={garageData.contact} onChange={handleInputChange} required />
//       </div>

//       <div>
//         <label>Vehicle Types:</label>
//         <label>
//           <input type="checkbox" value="Car" />
//           Car
//         </label>
//         <label>
//           <input type="checkbox" value="Bike" />
//           Bike
//         </label>
//       </div>

//       <div>
//         <label>Photos (max 4):</label>
//         <input type="file" multiple accept="image/*" />
//       </div>

//       <button type="submit">Add Garage</button>
//     </form>
//   );
// };

// export default GarageForm;
