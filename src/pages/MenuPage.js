import React from "react";
import { Link } from "react-router-dom";
import "../styles/MenuPage.css";

const MenuPage = ({ onLogout }) => {
  return (
    <div className="menu-container">
      <h2 className="menu-heading">Welcome to Virtual Pet!</h2>
      <ul className="menu-list">
        <li>
          <Link to="/pets/new" className="menu-link">
            Create Pet
          </Link>
        </li>
        <li>
          <Link to="/pets" className="menu-link">
            View My Pets
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

export default MenuPage;
