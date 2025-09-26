import LogoHeader from "../assets/layout/Logo_Header.svg";
import Menu_Header from "../assets/layout/Menu_Header.svg";
import Search from "../assets/layout/Search.svg";
import Shield from "../assets/layout/Shield.svg";
import Calendar from "../assets/layout/Calendar.svg";
import User from "../assets/layout/User.svg";
import "../css/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-mx1">
          {/* 메뉴 버튼 */}
          <div className="header-section header-left">
            <button className="header-btn header-btn-menu" type="button">
              <img src={Menu_Header} alt="Menu Icon" />
            </button>
          </div>

          {/* 로고 */}
          <div className="header-section header-logo">
            <button className="header-btn header-btn-logo">
              <img src={LogoHeader} alt="Header Logo" />
            </button>
          </div>
        </div>
        {/* 검색창 */}
        <div className="header-mx2">
          <div className="header-section header-search">
            <div className="header-search-bar">
              <img
                src={Search}
                alt="Search Icon"
                className="header-search-icon"
              />
              <input
                type="search"
                className="header-search-input"
                placeholder="지역, 구장, 팀이름으로 찾기"
              />
            </div>
          </div>

          {/* 아이콘 영역 */}
          <div className="header-section header-icons">
            <button className="header-btn header-btn-team">
              <img src={Shield} alt="Shield Icon" />
            </button>
            <button className="header-btn header-btn-match">
              <img src={Calendar} alt="Match Icon" />
            </button>
            <button className="header-btn header-btn-user">
              <img src={User} alt="User Icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
