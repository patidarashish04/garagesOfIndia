import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GarageListApiCall from "../api/garageListApi"


const GarageList = () => {
    const [loading, setLoading] = useState(true);
    const [filteredGarages, setFilteredGarages] = useState([]);
    const navigate = useNavigate(); // for navigation
    const [garageData, setGarageData] = useState([]);

    useEffect(() => {
        const loadGarages = async () => {
        //   setLoading(true); // show loader
          try {
            const data = await GarageListApiCall(); // await result
            setGarageData(data);               // update state
            // console.log("API Data:", data);
          } catch (error) {
            console.log("Error fetching garage data");
          } finally {
            // setLoading(false);
          }
        };
      
        loadGarages();

    }, []);

    useEffect(() => {
        // console.log("API Data garageData:", garageData);
        const renderGarages = () => {
            const garageMappedData = garageData.map((garage, i) => ({
                id: i + 1,
                name: garage?.name,
                address: garage?.address,
                overAllRating: {
                  avgRating: Math.random() * 5,
                  totalRatings: Math.floor(Math.random() * 100),
                },
                contact: garage?.contact,
                photos: garage?.photos, // or put sample image
              }));
              console.log(garageMappedData)
              setFilteredGarages(garageMappedData);
              setLoading(false);
        }
        renderGarages();
      }, [garageData]);

  
    // useEffect(() => {
      //fetch 
    //   const loadGarages = async()=>{
    //     try {
    //         const data = await GarageListApiCall()
    //         setGarageData(data)
    //         console.log(garageData)
    //     } catch (error) {
            
    //     }
    //   }
    //   loadGarages()
    
      // Dummy data or fetch from API
    //   const dummyGarages = Array.from({ length: 10 }).map((_, i) => ({
    //     id: i + 1,
    //     name: `Garage ${i + 1}`,
    //     address: `Location ${i + 1}`,
    //     overAllRating: {
    //       avgRating: Math.random() * 5,
    //       totalRatings: Math.floor(Math.random() * 100),
    //     },
    //     contact: `99999${i}000${i}`,
    //     photos: [""], // or put sample image
    //   }));

    
    // }, []);
  
    return (<div className="main-container">
        {/* Garage List */}
        <div className="garage-list">
            {loading ? (
                <p>Loading garages...</p>
            ) : filteredGarages.length > 0 ? (
                filteredGarages.map((garage, index) => (
                    <div key={index} className="garage-card-item">
                        <div className="garage-img">
                            <img
                                src={
                                    garage.photos[0] ||
                                    "https://storage.googleapis.com/bkt-gobumper-prod-web-app-static/offers-imgs/car-repair"
                                }
                                alt={garage.name || "Garage"}
                            />
                        </div>
                        <div className="garage-info">
                            <h3 className="garage-name">{garage.name || "Unknown Garage"}</h3>
                            <p className="garage-location">{garage.address || "N/A"}</p>
                            <p className="rating">
                                ⭐ {garage.overAllRating.avgRating.toFixed(1)} ({garage.overAllRating.totalRatings} Reviews)
                                <span className="badge verified">Verified</span>
                                <span className="badge popular"> Popular</span>
                            </p>
                            <div className="actions">
                                <a href={`tel:${garage.contact}`} className="call-btn">
                                    📞 {garage.contact || "N/A"}
                                </a>
                                <button
                                    className="details-btn"
                                    onClick={() => navigate(`/garage/${garage.id}`)}
                                >
                                    View Details
                                </button>
                                <button className="enquiry-btn">Send Enquiry</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No garages found</p>
            )}
        </div>
    </div>
    );
};
export default GarageList;