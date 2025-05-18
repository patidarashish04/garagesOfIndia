// src/components/GarageDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GarageDetail.css'; // Optional: import custom CSS
import BusinessHeader from './BusinessHeader';
import TabNavigation from './TabNavigation';
import PhotoGallery from './PhotoGallery';
import ContactSidebar from './ContactSidebar';

const GarageDetail = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9002/api/garages/${id}`)
      .then(response => {
        const data = response.data.data.data;
        setGarage(data);
        setPhotos(data.photos || []);
      })
      .catch(error => console.error('Error fetching garage details:', error));
  }, [id]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result]);
        // TODO: Send uploaded photo to backend if needed
      };
      reader.readAsDataURL(file);
    }
  };

  if (!garage) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <BusinessHeader garage={garage} />
      <TabNavigation />

      <div className="flex flex-col md:flex-row mt-4 gap-6">
        <div className="flex-1">
          <PhotoGallery photos={photos} setPhotos={setPhotos} />      
        </div>
        <ContactSidebar garage={garage} />
      </div>
    </div>
  );
};

export default GarageDetail;
