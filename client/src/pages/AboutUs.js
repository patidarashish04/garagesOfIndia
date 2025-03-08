import React from "react";
import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  // Dummy images for the carousel
  const images = [
     "https://media.istockphoto.com/id/1589417945/photo/hand-of-mechanic-holding-car-service-and-checking.jpg?s=612x612&w=0&k=20&c=02eGeLsQDyppYAK7k7WwxGUyxgG2a5n43yetegKvIfI=",
    "client/src/assets/LuxuryServiceBasic.jpeg",
    "client/src/assets/EssentialServicePackage.jpeg",
    "client/src/assets/EssentialServicePackage.jpeg",
  ];

  const description = `
    Welcome to Garages of India, a platform dedicated to connecting vehicle owners
    with the best garages and repair services across the country. Our mission is 
    to simplify the process of finding reliable garages and ensure a hassle-free 
    experience for every customer.

    India’s automotive industry has grown exponentially over the years, and so has 
    the need for trustworthy service providers. From bustling metros to smaller 
    towns, finding a garage that meets your needs can be challenging. That’s where 
    Garages of India steps in.

    We partner with a wide network of garages that specialize in various vehicle 
    services, including car and bike repairs, maintenance, detailing, and more. 
    Whether it’s routine maintenance or emergency repairs, our platform offers 
    reliable information, reviews, and ratings to help you make informed decisions.

    Why choose us?
    - Verified Garages: We feature only verified garages to ensure quality service.
    - Ratings & Reviews: Customer feedback is at the core of our platform, helping 
      others choose the best services.
    - Wide Network: From premium car services to local bike repair shops, we’ve got 
      it all covered.
    - Easy Search & Navigation: Filter garages by location, services offered, or 
      vehicle type to find what suits you best.

    Our vision is to create a seamless connection between vehicle owners and garages 
    while uplifting the automotive service sector in India. Garages of India is more 
    than just a directory—it’s a community where trust and quality meet technology.

    Explore our platform, read reviews, and book your next service with confidence. 
    Let’s make your vehicle maintenance journey smooth and reliable.
  `;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Button to go back to the homepage */}
      <button
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>About Us</h1>

      {/* Carousel for images */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        dynamicHeight
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Garage ${index + 1}`} style={{ height: "400px" }} />
          </div>
        ))}
      </Carousel>

      {/* Description */}
      <div style={{ marginTop: "30px", lineHeight: "1.8", textAlign: "justify" }}>
        {description.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
