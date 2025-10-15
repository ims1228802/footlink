import React, { useState } from "react";
import { level } from "../../data/team/level";
import "../../css/user/UserLevel.css";

export default function UserLevel({ teamState, setTeamState }) {
  const [clickCount, setClickCount] = useState(0);
  const number = level.length;

  const onClickHandler = (idx) => {
    setClickCount(idx);
    setTeamState({
      ...teamState,
      level: level[idx].level,
    });
  };

  return (
    <div className="userlevel-container">
      <h1 className="userlevel-title">내 실력 설정하기</h1>

      <div className="userlevel-text">
        <h2>{level[clickCount].level}</h2>
        <p>{level[clickCount].content}</p>
      </div>

      <div className="userlevel-bar">
        {Array.from({ length: number }, (_, idx) => (
          <div
            key={idx}
            className={`bar-segment ${idx <= clickCount ? "fill" : ""}`}
            onClick={() => onClickHandler(idx)}
          ></div>
        ))}
      </div>

      <div className="position-section">
        <p className="section-title">포지션 능력을 선택해 주세요</p>
        <div className="button-group">
          <button className="pos-btn">공격</button>
          <button className="pos-btn">수비</button>
        </div>

        <p className="section-title">포지션을 선택해 주세요</p>
        <div className="button-group">
          <button className="pos-btn">공격수</button>
          <button className="pos-btn">미드필더</button>
          <button className="pos-btn">수비수</button>
          <button className="pos-btn">골키퍼</button>
        </div>
      </div>

      <button className="save-btn">기억하기</button>
    </div>
  );
}
