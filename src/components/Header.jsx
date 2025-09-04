import logoHeader from "../assets/layout/logo_Header.svg";
import menuHeader from "../assets/layout/menu_Header.svg";
import { BsSearch,BsShield,BsDiagram2,BsPerson } from "react-icons/bs";
import '../css/Header.css';

export default function Header() {
  return (
    <header>
      <div id="header">
          <div className="header-menu">
            <button className="header-nav-btn" type="button">
              <img src={menuHeader} alt="menuHeader" />
            </button>
          </div>
          <div className="header-logo">
            <button className="header-logo-btn">
              <img src={logoHeader} alt="HeaderLogo" />
            </button>
          </div>
          <div className="header-search">
            <div className="header-search-bar">
              <BsSearch />
              <input
                type="search"
                placeholder="지역,구장,팀이름으로 찾기"
              />
            </div>
          </div>
          <div className="header-team-icon">
            <button className="header-team">
              <BsShield />
            </button>
          </div>
          <div className="header-match-icon">
            <button className="header-match">
              <BsDiagram2 />
            </button>
          </div>
          <div className="header-mypage-icon">
            <button className="header-mypage">
              <BsPerson />
            </button>
          </div>
      </div>
    </header>
  );
}
