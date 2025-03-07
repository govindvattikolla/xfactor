// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import ProtectedRoute from "./components/auth/protectedRoute";
import AdminDashboard from "./components/dashboards/admindashboard";
import UserDashboard from "./components/dashboards/userdashboard"

import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./components/auth/SignUpPage";
import LoginPage from "./components/auth/LoginPage";
// import AuthPages from "./components/auth/AuthPages";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={AdminDashboard} role="admin" />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={UserDashboard} role="user" />}
          />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
