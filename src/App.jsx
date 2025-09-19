import Layout from "./layout/Layout.jsx";
import Sidebar from "./components/Sidebar.jsx";
import React, { useState } from "react";
import MyInfo from "./pages/user/MyInfo.jsx";
import Main from "./pages/user/Main.jsx";
import FindEmail from "./pages/user/FindEmail.jsx";
import FindPassword from "./pages/user/FindPassword.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import LoginPage from "./pages/user/LoginPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/FindEmail" element={<FindEmail />} />
        <Route path="/FindPassword" element={<FindPassword />} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route
          path="/main"
          element={
            <Layout>
              <Main></Main>
            </Layout>
          }
        />
      </Routes> */}
    </div>
  );
}

export default App;
