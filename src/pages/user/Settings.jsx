import React, { useState } from "react";
import "../../css/user/Settings.css";

export default function Settings() {
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [isLevelHidden, setIsLevelHidden] = useState(false);
  const [isKakaoAlert, setIsKakaoAlert] = useState(true);

  return (
    <div className="settings-container">
      <h1 className="settings-title">설정</h1>

      {/* 계정 설정 */}
      <section className="settings-section">
        <h2 className="settings-subtitle">계정설정</h2>
        {/* <div className="settings-row">
          <span className="settings-label">SNS계정</span>
          <span className="sns-type">KAKAO</span>
        </div> */}
        <div className="settings-row">
          <span className="settings-label">휴대폰번호</span>
          <span className="settings-text">010-9999-9999</span>
          <button className="btn-edit">수정</button>
        </div>
        <div className="settings-row">
          <span className="settings-label">비밀번호 바꾸기</span>
          <button className="btn-edit">수정</button>
        </div>
        <div className="settings-row">
          <span className="settings-label">탈퇴하기</span>
          <button className="btn-withdraw">회원탈퇴</button>
        </div>
      </section>

      {/* 공개 설정 */}
      <section className="settings-section">
        <h2 className="settings-subtitle">공개설정</h2>
        <div className="settings-toggle">
          <span>프로필 공개</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isProfilePublic}
              onChange={() => setIsProfilePublic(!isProfilePublic)}
            />
            <span className="slider" />
          </label>
        </div>

        <div className="settings-toggle">
          <span>레벨 가리기</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isLevelHidden}
              onChange={() => setIsLevelHidden(!isLevelHidden)}
            />
            <span className="slider" />
          </label>
        </div>
      </section>

      {/* 알림 설정 */}
      <section className="settings-section">
        <h2 className="settings-subtitle">알림설정</h2>
        <div className="settings-toggle">
          <span>카카오 문자 알림</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isKakaoAlert}
              onChange={() => setIsKakaoAlert(!isKakaoAlert)}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </div>
  );
}
