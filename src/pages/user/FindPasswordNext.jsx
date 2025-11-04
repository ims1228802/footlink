import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import "../../css/user/FindPasswordNext.css";

export default function FindPasswordNext() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("비밀번호가 성공적으로 변경되었습니다!");
  };

  return (
    <div className="findpasswordnext-container">
      <form className="findpasswordnext-box" onSubmit={handleSubmit}>
        <Link to="/FindPassword" className="findpasswordnext-backlink">
          <img
            src={ArrowBackIos}
            alt="이전으로"
            className="findpasswordnext-backicon"
          />
        </Link>

        <h2 className="findpasswordnext-title">비밀번호 재설정</h2>
        <div className="findpasswordnext-description">
          <p>새로운 비밀번호를 설정해주세요.</p>
          <p>비밀번호는 영문, 숫자 조합하여 8자 이상으로 입력해주세요.</p>
        </div>

        <div className="findpasswordnext-inputbox">
          <label className="findpasswordnext-label">새 비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="findpasswordnext-input"
          />
        </div>

        <div className="findpasswordnext-inputbox">
          <label className="findpasswordnext-label">새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="findpasswordnext-input"
          />
        </div>

        <button
          type="submit"
          disabled={password === "" || confirm === ""}
          className="findpasswordnext-btn"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}
