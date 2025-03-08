// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../styles/GarageDetails.css"; // Import the CSS for styling

// const GarageDetails = () => {
//   const { id } = useParams(); // Get the garage ID from the URL
//   const [garage, setGarage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:9002/api/garages/${id}`) // Replace with your actual endpoint
//       .then((response) => {
//         setGarage(response.data.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching garage details:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   console.log('=====>garage>>>', garage)
//   if (loading) {
//     return <div className="loading">Loading garage details...</div>;
//   }

//   if (!garage) {
//     return <div className="error">Garage not found.</div>;
//   }

//   return (
//     <div className="garage-details-container">
//       <div className="garage-header">
//         <h1>{garage.name || "Unknown Garage"}</h1>
//         <p className="address">{garage.name || "Address not available"}</p>
//         <p className="contact">
//           <strong>Contact:</strong> {garage.name || "N/A"}
//         </p>
//       </div>
//       <div className="garage-body">
//         <img
//           src={garage.name || "https://via.placeholder.com/800x400"}
//           alt={garage.name}
//           className="garage-image"
//         />
//         <div className="details">
//           <h3>Services Offered:</h3>
//           {Array.isArray(garage.services) && garage.services.length > 0 ? (
//             <ul>
//               {garage.services.map((service, index) => (
//                 <li key={index}>
//                   {service.name}: ₹{service.price}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No services available</p>
//           )}
//         </div>
//       </div>
//       <div className="garage-footer">
//         <a href={`tel:${garage.contact}`} className="btn btn-success me-2">
//           Call Garage
//         </a>
//         <button className="btn btn-primary">Book Service</button>
//       </div>
//     </div>
//   );
// };

// export default GarageDetails;
