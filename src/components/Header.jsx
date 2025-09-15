import LogoHeader from "../assets/layout/Logo_Header.svg";
import Menu_Header from "../assets/layout/Menu_Header.svg";
import Search from "../assets/layout/Search.svg";
import Shield from "../assets/layout/Shield.svg";
import Calendar from "../assets/layout/Calendar.svg";
import User from "../assets/layout/User.svg";

export default function Header() {
  return (
    <header>
      <div id="header">
          <div className="header-menu">
            <button className="header-nav-btn" type="button">
              <img src={Menu_Header} alt="MenuIcon" />
            </button>
          </div>
          <div className="header-logo">
            <button className="header-logo-btn">
              <img src={LogoHeader} alt="HeaderLogo" />
            </button>
          </div>
          <div className="header-search">
            <div className="header-search-bar">
              <img src={Search} alt="SearchIcon" />
              <input
                type="search"
                placeholder="지역,구장,팀이름으로 찾기"
              />
            </div>
          </div>
          <div className="header-team-icon">
            <button className="header-team">
              <img src={Shield} alt="ShieldIcon" />
            </button>
          </div>
          <div className="header-match-icon">
            <button className="header-match">
              <img src={Calendar} alt="MatchIcon" />
            </button>
          </div>
          <div className="header-mypage-icon">
            <button className="header-mypage">
              <img src={User} alt="UserIcon" />
            </button>
          </div>
      </div>
    </header>
  );
}
