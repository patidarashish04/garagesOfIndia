import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GarageListApiCall from "../api/garageListApi"


const GarageList = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredGarages, setFilteredGarages] = useState([]);
    const navigate = useNavigate(); // for navigation
    const [garageData, setGarageData] = useState([]);

    // Step 1: Ask for location once
    useEffect(() => {
        const locationData = localStorage.getItem("user_location");

        const askLocation = async () => {
            const confirmLocation = window.confirm("This app needs your location to add the garage. Allow access?");
            if (!confirmLocation) return;
        
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by this browser.");
                return;
            }
        
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
        
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
                localStorage.setItem("user_location", JSON.stringify({ lat: latitude, long:longitude }));
            } catch (error) {
                console.error("Error getting location:", error);
                alert("Location access is required to add a garage.");
            }
        };

        
        let location = null;
        if (locationData) {
          try {
            const parsed = JSON.parse(locationData);
            if (parsed?.lat && parsed?.long) {
              location = parsed;
              setLatitude(parsed?.lat);
              setLongitude(parsed?.long);
            }
          } catch (e) {
            console.error("Invalid location data", e);
          }
        }
      
        if (!location) {
          // Trigger popup logic here
          askLocation();
        }
    }, []);

    useEffect(() => {
        const loadGarages = async () => {
            //   setLoading(true); // show loader
            if (latitude === null || longitude === null) return;
            if (latitude !== null && longitude !== null) {
                try {
                    const data = await GarageListApiCall(latitude, longitude); // await result
                    setGarageData(data);               // update state
                    // console.log("API Data:", data);
                    console.log("this is garage data : "+data)
                    setLoading(false);
                } catch (error) {
                    console.log("Error fetching garage data");
                    setLoading(false);
                } finally {
                    // setLoading(false);
                    setLoading(false);
                }
            }
        };

        loadGarages();

    }, [latitude, longitude]);

    useEffect(() => {
        // console.log("API Data garageData:", garageData);
        const renderGarages = () => {
            const garageMappedData = garageData.map((garage, i) => ({
                // first change
                _id: garage._id,
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
    const handleSendPromotion = async () => {
        try {
        //   const user = JSON.parse(localStorage.getItem("user")) || 'Hi User'; // if login info is stored
        //   const phone = user?.phone || "+918461975062"; // fallback or prefilled number
      
          const response = await axios.post("http://localhost:9002/api/garages/67f434837a547565f527cd98/notify", {
            // phone,
          });
      
          if (response.status === 200) {
            alert("Promotion sent via WhatsApp! ✅");
          } else {
            alert("Failed to send promotion ❌");
          }
        } catch (error) {
          console.error("Send WhatsApp Promotion Error:", error);
          alert("Something went wrong. Please try again.");
        }
      };

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
                                    onClick={() => navigate(`/garages/${garage._id}`)}
                                >
                                    View Details
                                </button>
                                <button className="enquiry-btn" onClick={handleSendPromotion}>
                                    Send Enquiry
                                </button>
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