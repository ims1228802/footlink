import React, { useEffect, useState } from "react";
import "../../css/user/Settings.css";
import api from "../../hooks/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

export default function Settings() {
  const [settings, setSettings] = useState({
    phone: "",
    isProfilePublic: true,
    isLevelHidden: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 진입 시 DB 값 불러오기
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/myinfo/settings");
        if (data) setSettings(data);
      } catch (err) {
        console.error("설정 불러오기 실패:", err);
      }
    })();
  }, []);

  // 휴대폰번호 수정 후 돌아왔을 때 즉시 반영
  useEffect(() => {
    if (location.state?.updatedPhone) {
      setSettings((prev) => ({
        ...prev,
        phone: location.state.updatedPhone,
      }));
    }
  }, [location.state]);

  // 공개 설정
  const handleToggle = async (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    try {
      await api.put("/myinfo/settings", updated);
    } catch (err) {
      console.error("설정 저장 실패:", err);
      alert("설정 저장 중 오류가 발생했습니다.");
      setSettings(settings); // 실패 시 원복
    }
  };

  // 회원탈퇴
  const handleWithdraw = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;

    try {
      await api.delete("/myinfo/withdraw");
      alert("회원탈퇴가 완료되었습니다.");
      localStorage.clear(); // 토큰 제거
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("회원탈퇴 중 오류가 발생했습니다.");
    }
  };

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
          <span className="settings-text">
            {settings.phone || "전화번호 없음"}
          </span>
          <button
            className="btn-edit"
            onClick={() => navigate("/user/edit-phone")}
          >
            수정
          </button>
        </div>
        <div className="settings-row">
          <span className="settings-label">비밀번호 바꾸기</span>
          <button
            className="btn-edit"
            onClick={() => navigate("/user/reset-password")}
          >
            수정
          </button>
        </div>
        <div className="settings-row">
          <span className="settings-label">탈퇴하기</span>
          <button className="btn-withdraw" onClick={() => handleWithdraw()}>
            회원탈퇴
          </button>
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
              checked={settings.isProfilePublic}
              onChange={() => handleToggle("isProfilePublic")}
            />

            <span className="slider" />
          </label>
        </div>

        <div className="settings-toggle">
          <span>레벨 가리기</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.isLevelHidden}
              onChange={() => handleToggle("isLevelHidden")}
            />
            <span className="slider" />
          </label>
        </div>
      </section>

      {/* 알림 설정 */}
      <section className="settings-section">
        <h2 className="settings-subtitle">알림설정</h2>
        <div className="settings-toggle">
          <span>메세지 알림</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </div>
      </section>
    </div>
  );
}
