import React from "react";
import { Link } from "react-router-dom";
import "../styles/MenuPage.css";

const AdminMenuPage = ({ onLogout }) => {
  return (
    <div className="menu-container">
      <h2 className="menu-heading">Admin Dashboard</h2>
      <ul className="menu-list">
        <li>
          <Link to="/admin/pets" className="menu-link">
            View All Pets
          </Link>
        </li>
        <li>
          <button className="menu-logout" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenuPage;
