import Layout from "./layout/Layout.jsx";
import Sidebar from "./components/Sidebar.jsx";
import React, { useState } from "react";
import Router from "./routes/Router";
import "./app.css";


function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}
export default App;