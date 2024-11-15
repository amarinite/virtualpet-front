import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MenuPage from "./pages/MenuPage";
import PetListAdminPage from "./pages/PetListAdminPage";
import PetFormPage from "./pages/PetFormPage";
import PetListPage from "./pages/PetListPage";
import AdminMenuPage from "./pages/AdminMenuPage"; // Importa AdminMenuPage

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/menu" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/menu"
          element={
            token ? <MenuPage onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/menu"
          element={
            token ? (
              <AdminMenuPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/pets"
          element={
            token ? <PetListAdminPage token={token} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/pets"
          element={token ? <PetListPage token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/pets/new"
          element={token ? <PetFormPage token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/pets/:id"
          element={token ? <PetFormPage token={token} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
