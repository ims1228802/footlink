import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import React, { useState } from "react";
import MyInfo from "./pages/user/MyInfo.jsx";
import FindEmail from "./pages/user/FindEmail.jsx";
import FindPassword from "./pages/user/FindPassword.jsx";
import SignUpForm from "./pages/user/SignUpForm.jsx";
import LoginPage from "./pages/user/LoginPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/FindEmail" element={<FindEmail />} />
        <Route path="/FindPassword" element={<FindPassword />} />
      </Routes>
    </div>
  );
}

export default App;
