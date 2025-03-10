import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">XFactor</h2>
      <ul className="sidebar-nav">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;