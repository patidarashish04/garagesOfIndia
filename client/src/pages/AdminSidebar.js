import React from "react";
import "../styles/AdminSidebar.css";
import profile from '../assets/profile.jpg';
import { Link } from "react-router-dom"; // Import Link for navigation




const AdminSidebar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <div className="sidebar-header p-3">
        <img
          src={profile}
          alt="Profile"
          className="profile-img rounded-circle"
        />
        <h6 className="mt-2">Kenneth Osborne</h6>
        <p className="mt-2">Welcome</p>
      </div>
      <div className="search-box p-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type to search..."
        />
      </div>
      <div className="menu-items p-2">
  <ul className="list-unstyled">
    <li className="menu-item active">
      <i className="bi bi-house-door"></i>
      <Link to="/admin/dashboard"> Dashboard </Link>
      <span className="badge bg-danger ms-2">New</span>
    </li>
    <li className="menu-item">
      <i className="bi bi-layers"></i>
      <Link to="/admin/garages"> Garages </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-ui-checks"></i>
      <Link to="/admin/recent-post"> Recent Post </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-bar-chart-line"></i>
      <Link to="/admin/blogs"> Blogs </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-table"></i>
      <Link to="/admin/post-reviews"> Post Reviews </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-image"></i>
      <Link to="/admin/car-garages"> Car Garages </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-people"></i>
      <Link to="/admin/bike-garages"> Bike Garages </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-shield-lock"></i>
      <Link to="/admin/service-center"> Service Center </Link>
    </li>
    <li className="menu-item">
      <i className="bi bi-book"></i>
      <Link to="/admin/documentation"> Documentation </Link>
    </li>
  </ul>
</div>
      <div className="category-section p-3">
        <p className="text-muted">Category</p>
        <div className="category">
          <span className="badge bg-danger">#Sales</span>
          <span className="badge bg-success">#Marketing</span>
          <span className="badge bg-primary">#Growth</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
