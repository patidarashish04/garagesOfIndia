import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../src/pages/AdminDashboard";
// import ManageUsers from "./pages/admin/ManageUsers";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Slider from "./components/Slider";
import NearbyGarages from "./components/NearbyGarages";
import ServiceSection from "./components/ServiceSection";
import BlogList from "./components/BlogList";
import TestimonialList from "./components/postReview";
import HeroSection from "./components/HeroSection";
// import Brands from "./components/Brand";
import FAQ from "./components/FAQ";
import ContactPage from "../src/pages/ContactSection";
import AboutUs from "../src/pages/AboutUs"; // Update the path
import GaragesPage from "../src/pages/GaragesPage"; // Update the path
import Garages from "../src/components/Garage"; // Update the path
import GaragesCard from "../src/components/GarageCard"; // Update the path
import GarageDetail from "../src/components/GarageDetail"; // Update the path
import BlogPage from "../src/pages/BlogPage"; // Update the path
import SearchResults from "../src/components/SearchResults"; // Update the path







import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      {/* Main Application */}
      <Header />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Slider />
              <ServiceSection />
              <BlogList />
              <TestimonialList />
              {/* <Brands /> */}
              <GaragesCard />
             { /* <Garages />   to create garage */}
              {/* <FAQ /> */}
            </>
          }
        />
        {/* Contact Us Route */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUs />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/admin/garages" element={<GaragesPage />} />
        <Route path="/garages/:id" element={<GarageDetail />} />
        <Route path="/admin/blogs" element={<BlogPage />} />
        {/* <Route path="/admin/users" element={<ManageUsers />} /> */}
        {/* Add more admin routes */}
      </Routes>
      <Footer />
    </Router>
    
  );
};

export default App;
