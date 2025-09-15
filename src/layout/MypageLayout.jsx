import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "../css/Layout.css";

export default function MypageLayout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">
           {/* 자식 라우트 렌더링 */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
