import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "../css/MypageLayout.css";

export default function MypageLayout() {
  return (
    <div className="layout m">
      <Header />
      <div className="layout-body m">
        <Sidebar />
        <main className="layout-content m">
           {/* 자식 라우트 렌더링 */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
