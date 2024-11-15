import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PetFormPage.css";

const PetFormPage = ({ token }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [energyLevel, setEnergyLevel] = useState(0);
  const [size, setSize] = useState("");
  const [character, setCharacter] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const pet = response.data;
          setName(pet.name);
          setType(pet.type);
          setColor(pet.color);
          setEnergyLevel(pet.energyLevel);
          setSize(pet.characteristics?.size || "");
          setCharacter(pet.characteristics?.character || "");
        });
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const characteristics = {
      size: size.toLowerCase(),
      character: character.toLowerCase(),
    };

    const pet = {
      name,
      type,
      color,
      energyLevel,
      characteristics,
    };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/pets/${id}`, pet, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:8080/pets", pet, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/pets");
    } catch (err) {
      console.error("Error saving pet", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Pet" : "Create Pet"}</h2>
      <form onSubmit={handleSubmit} className="pet-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Fluffy"
          required
        />

        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="e.g., Dog, Cat"
          required
        />

        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="e.g., Brown"
          required
        />

        <label htmlFor="energyLevel">Energy Level</label>
        <input
          type="number"
          id="energyLevel"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
          placeholder="e.g., 5 (0-10)"
          min="0"
          max="10"
          required
        />

        <label htmlFor="size">Size</label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        >
          <option value="">Select Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label htmlFor="character">Character</label>
        <select
          id="character"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          required
        >
          <option value="">Select Character</option>
          <option value="grumpy">Grumpy</option>
          <option value="friendly">Friendly</option>
          <option value="serious">Serious</option>
        </select>

        <button type="submit" className="submit-btn">
          {id ? "Update" : "Create"} Pet
        </button>
      </form>
    </div>
  );
};

export default PetFormPage;
