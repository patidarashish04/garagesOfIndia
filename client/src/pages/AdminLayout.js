import React from "react";
import AdminSidebar from "../pages/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="content flex-grow-1" style={{ marginLeft: "250px", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
