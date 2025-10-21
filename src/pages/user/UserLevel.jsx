import React, { useState } from "react";
import "../../css/user/UserLevel.css";

export default function UserLevel() {

     const level = [
    { level: "초보", content: "축구를 이제 막 시작했어요!" },
    { level: "중급", content: "기본기와 팀플레이가 익숙해요." },
    { level: "상급", content: "전술 이해도와 피지컬이 좋아요!" },
    { level: "프로", content: "경기 운영과 스킬이 뛰어나요." },
  ];

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
    <div className="level-container">
      <h4 className="page-title">내 실력 설정하기</h4>
      <div>평균실력을 알려주세요</div>

      <div className="level-select-text">
        <h2>{level[clickCount].level}</h2>
        <p>{level[clickCount].content}</p>
      </div>

      <div className="level-select">
        {Array.from({ length: number }, (_, idx) => (
          <div
            key={idx}
            className={`select-area ${idx <= clickCount ? "fill" : ""}`}
            onClick={() => onClickHandler(idx)}
          ></div>
        ))}
      </div>

      <div className="position-section">
        <p className="section-title">포지션 능력을 선택해 주세요</p>
        <div className="position-buttons">
          <button className="pos-btn">공격</button>
          <button className="pos-btn">수비</button>
        </div>

        <p className="section-title">포지션을 선택해 주세요</p>
        <div className="position-buttons">
          <button className="pos-btn">공격수</button>
          <button className="pos-btn">미드필더</button>
          <button className="pos-btn">수비수</button>
          <button className="pos-btn">골키퍼</button>
        </div>
      </div>

      <button className="save-btn">저장하기</button>
    </div>
  );
}
