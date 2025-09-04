import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import React, { useState } from "react";
import MyInfo from "./pages/user/MyInfo.jsx"

function App() {
  
  return (
    <div className="App">
      <Header />
      <MyInfo />
      { /*<Sidebar />*/}
      <Footer />
    </div>
  );
}

export default App;
