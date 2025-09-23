import Layout from "./layout/Layout.jsx";
import Sidebar from "./components/Sidebar.jsx";
import React, { useState } from "react";
import Router from "./routes/Router";
import "./app.css";


function App() {
  return (
    <div className="App">
      <Router />
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