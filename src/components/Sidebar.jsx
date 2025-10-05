// Sidebar.jsx
import Vector from "../assets/layout/Vector.svg";
import KnightShield from "../assets/layout/KnightShield.svg";
import Handshake from "../assets/layout/Handshake.svg";
import Commercial from "../assets/layout/Commercial.svg";
import Help_outline from "../assets/layout/Help_outline.svg";
import Settings from "../assets/layout/Settings.svg";
import Output from "../assets/layout/Output.svg";
import { Link, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  // 현재 경로와 비교해 active 메뉴 판단
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {/* 프로필 영역 */}
        <div className="sidebar-top">
          <img
            src={user?.img || "/default-profile.png"}
            alt="Profile"
            className="sidebar-profile-img"
          />
          <h3 className="sidebar-profile-name">{user?.name || "Guest"}</h3>
          <p className="sidebar-profile-email">{user?.email || ""}</p>
        </div>

        {/* 구분선 */}
        <div className="sidebar-divider"></div>

        {/* MY 정보관리 */}
        <div className="sidebar-block">
          <div className="sidebar-title">MY 정보관리</div>
          <ul className="sidebar-list">
            <li className={`sidebar-item ${isActive("/user/my-info") ? "active" : ""}`}>
              <Link to="/user/my-info" className="sidebar-link">
                <img src={Vector} alt="내 정보" className="sidebar-icon" />
                <span>내 정보</span>
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("/user/my-teams") ? "active" : ""}`}>
              <Link to="/user/my-teams" className="sidebar-link">
                <img src={KnightShield} alt="소속한팀" className="sidebar-icon" />
                <span>소속한 팀</span>
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("/user/match-info") ? "active" : ""}`}>
              <Link to="/user/match-info" className="sidebar-link">
                <img src={Handshake} alt="매치정보" className="sidebar-icon" />
                <span>매치정보</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* 고객센터 */}
        <div className="sidebar-block">
          <div className="sidebar-title">고객센터</div>
          <ul className="sidebar-list">
            <li className={`sidebar-item ${isActive("/notice") ? "active" : ""}`}>
              <Link to="/notice" className="sidebar-link">
                <img src={Commercial} alt="공지사항" className="sidebar-icon" />
                <span>공지사항</span>
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("/faq") ? "active" : ""}`}>
              <Link to="/faq" className="sidebar-link">
                <img src={Help_outline} alt="자주 묻는 질문" className="sidebar-icon" />
                <span>자주 묻는 질문</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* 기타 */}
        <div className="sidebar-block">
          <div className="sidebar-title">기타</div>
          <ul className="sidebar-list">
            <li className={`sidebar-item ${isActive("/settings") ? "active" : ""}`}>
              <Link to="/settings" className="sidebar-link">
                <img src={Settings} alt="설정" className="sidebar-icon" />
                <span>설정</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <button onClick={handleLogout} className="sidebar-link sidebar-logout">
                <img src={Output} alt="로그아웃" className="sidebar-icon" />
                <span>로그아웃</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
