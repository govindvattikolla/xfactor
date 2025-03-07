// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import ProtectedRoute from "./components/auth/protectedRoute";
import AdminDashboard from "./components/dashboards/admindashboard";

import { AuthProvider } from "./context/AuthContext";
import AuthPages from "./components/auth/AuthPages";





const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<AuthPages />} />
          <Route path="/login" element={<AuthPages/>} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={AdminDashboard} role="admin" />}
          />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
