import LogoHeader from "../assets/layout/Logo_Header.svg";
import Menu_Header from "../assets/layout/Menu_Header.svg";
import Search from "../assets/layout/Search.svg";
import Shield from "../assets/layout/Shield.svg";
import Calendar from "../assets/layout/Calendar.svg";
import ArrowBackIos from "../assets/icon/ArrowBackIos.svg";
import User from "../assets/layout/User.svg";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {


  const { data: user } = useUser();     // 로그인된 유저정보
  const queryClient = useQueryClient(); // 캐시 접근
  const navigate = useNavigate();


  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClear = () => setSearchText("");

  const handleUserClick = () => {
    if (user) {
      // 로그인되어 있음 → 마이페이지로 이동
      navigate("/user/my-info");
    } else {
      // 로그인 안되어 있음 → 로그인 페이지로 이동
      navigate("/login");
    }
  };

  return (
    <header className="header">
      {isMobileSearch ? (
      <div className="header-mobile-search">
        <button onClick={() => setIsMobileSearch(false)} className="back-btn">
          <img src={ArrowBackIos} alt="Back" />
        </button>

        <div className="header-search">
          <img src={Search} alt="Search" className="header-search-icon" />
          <input
            id="searchInput"
            name="search"
            type="search"
            className="header-search-input"
            placeholder="지역, 구장, 팀 이름으로 찾기"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          {searchText && (
            <button className="clear-btn" onClick={handleClear}></button>
          )}
        </div>
      </div>
       ) : (
      <div className="header-container">
        <div className="header-mx1">
          <button className="header-btn header-btn-menu">
            <img src={Menu_Header} alt="Menu Icon" />
          </button>
          <button
            className="header-btn header-btn-logo"
            onClick={() => navigate("/main")}
          >
            <img src={LogoHeader} alt="Header Logo" />
          </button>
        </div>

        <div className="header-mx2">
          <div className="header-search">
            <img
              src={Search}
              alt="Search Icon"
              className="header-search-icon"
              onClick={() => setIsMobileSearch(true)}
            />
            <input
              type="search"
              className="header-search-input"
              placeholder="지역, 구장, 팀 이름으로 찾기"
            />
          </div>

          <div className="header-icons">
            <button
              className="header-btn header-btn-team"
              onClick={() => navigate("/teamList")}
            >
              <img src={Shield} alt="Shield Icon" />
            </button>
            <button
              className="header-btn header-btn-match"
              onClick={() => navigate("/match")}
            >
              <img src={Calendar} alt="Match Icon" />
            </button>
            <button
              className="header-btn header-btn-user"
              onClick={handleUserClick}
            >
              <img src={User} alt="User Icon" />
            </button>
          </div>
        </div>
      </div>
       )}
    </header>
  );
}
