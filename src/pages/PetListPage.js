import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/PetListPage.css";

const PetListPage = ({ token }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/pets/myPets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPets(response.data);
      })
      .catch((err) => {
        console.error("Error fetching pets", err);
      });
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await axios.delete(`http://localhost:8080/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(pets.filter((pet) => pet.id !== id));
      } catch (err) {
        console.error("Error deleting pet", err);
      }
    }
  };

  return (
    <div className="petlist-container">
      <h2 className="heading">Your Pets</h2>
      <table className="pet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>
                <Link to={`/pets/${pet.id}`} className="action-link">
                  Edit
                </Link>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(pet.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/pets/new" className="create-btn">
        Create new pet
      </Link>
    </div>
  );
};

export default PetListPage;
