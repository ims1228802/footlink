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
import SearchBox from "./SearchBox";

export default function Header() {
  const { data: user } = useUser();
  const navigate = useNavigate();
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  const handleUserClick = () => {
    if (user) navigate("/user/my-info");
    else navigate("/login");
  };

  // ✅ 선택 항목에 따라 상세/페이지로 즉시 이동
  function goSearch(itemOrText) {
    const isObj = typeof itemOrText !== "string";
    const q = isObj ? itemOrText.name : itemOrText;
    if (!q?.trim()) return;

    // 1) 팀(최근검색 포함) → 팀 상세
    if (isObj && itemOrText.type === "team" && itemOrText.id) {
      navigate(`/teamDetail?teamCode=${encodeURIComponent(itemOrText.id)}`);
      return;
    }

    // 2) 구장 → 구장 페이지(프로젝트 규칙에 맞게 수정)
    if (isObj && itemOrText.type === "ground" && itemOrText.id) {
      // 예: navigate(`/selectfield?stadiumId=${encodeURIComponent(itemOrText.id)}`);
      navigate(`/selectfield`);
      return;
    }

    // 3) 순수 문자열(엔터) → 팀 리스트(검색 결과)
    navigate(`/teamList?keyword=${encodeURIComponent(q)}`);
  }

  return (
    <header className="header">
      {isMobileSearch ? (
        <div className="header-mobile-search">
          <button onClick={() => setIsMobileSearch(false)} className="back-btn">
            <img src={ArrowBackIos} alt="Back" />
          </button>

          <div className="header-search">
            <img src={Search} alt="Search" className="header-search-icon" />
            <SearchBox
              onSelect={goSearch}
              className="header-search-input w-[280px]"
              autoFocus
            />
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
              <SearchBox
                onSelect={goSearch}
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
