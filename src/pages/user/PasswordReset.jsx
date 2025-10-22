import React, { useState } from "react";
import "../../css/user/PasswordReset.css";
import api from "../../hooks/axiosInstance"
import { useNavigate } from "react-router-dom";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (!password || !confirm) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await api.put("/myinfo/password", { password });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/user/settings");
    } catch (err) {
      console.error(err);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="password-reset-container">
      <h1 className="page-title">비밀번호 재설정</h1>

      <p className="page-desc">
        새 비밀번호를 설정해주세요. <br />
        비밀번호는 영문, 숫자를 조합하여 8자 이상으로 입력해주세요.
      </p>

      <div className="form-group form-group-password">
        <input
          className="input-password"
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group form-group-confirm">
        <input
          className="input-confirm"
          type="password"
          placeholder="새 비밀번호를 다시 입력해주세요."
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <button
        className="btn-submit btn-change-password"
        onClick={handleChangePassword}
      >
        비밀번호 변경
      </button>
    </div>
  );
}
