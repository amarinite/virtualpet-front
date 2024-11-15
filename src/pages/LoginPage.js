import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      onLogin(response.data.token);

      // Redirigir según el nombre de usuario
      if (username === "admin") {
        navigate("/admin/menu");
      } else {
        navigate("/menu");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-heading">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
