import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 3) {
      setMessage("Password must be at least 3 characters long.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/signup", {
        username,
        email,
        password,
      });
      setMessage("User created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("Error creating user");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="form-heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email" // Use email input type for better UX
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Signup</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
