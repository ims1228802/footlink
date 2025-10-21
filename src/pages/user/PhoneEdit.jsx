import React, { useState } from "react";
import "../../css/user/PhoneEdit.css";
import api from "../../hooks/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function PhoneEdit() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  // 인증번호 요청
  const handleSendCode = async () => {
    if (!phone) return alert("휴대폰번호를 입력해주세요.");
    try {
      await api.post("/phone/request", { phone });
      alert("인증번호가 발송되었습니다.");
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("인증번호 요청에 실패했습니다.");
    }
  };

  // 인증번호 확인
  const handleVerify = async () => {
    if (!code) return alert("인증번호를 입력해주세요.");
    try {
      const res = await api.post("/phone/verify", { phone, code });
      if (res.status === 200) {
        alert("인증이 완료되었습니다.");
        setVerified(true);
      }
    } catch (err) {
      console.error(err);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  // 휴대폰번호 변경 완료
  const handleChangePhone = async () => {
    if (!verified) return alert("인증을 먼저 완료해주세요.");
    try {
      await api.put("/myinfo/phone", { phone });
      alert("휴대폰번호가 변경되었습니다.");
      navigate("/user/settings", { state: { updatedPhone: phone } }); // 새 번호 전달
    } catch (err) {
      console.error(err);
      alert("휴대폰번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="phone-edit-container">
      <h1 className="page-title">휴대폰번호 수정</h1>

      <p className="page-desc">
        새로운 휴대폰번호를 입력하고
        <br />
        인증을 완료해주세요.
      </p>

      <div className="form-group form-group-phone">
        <input
          className="input-phone"
          type="tel"
          placeholder="새 휴대폰번호를 입력해주세요."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className={`btn-send ${sent ? "btn-sent" : ""}`}
          disabled={sent}
          onClick={handleSendCode}
        >
          {sent ? "전송 완료" : "인증번호 받기"}
        </button>
      </div>

      <div className="form-group form-group-code">
        <input
          className="input-code"
          type="text"
          placeholder="인증번호를 입력해주세요."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn-verify" onClick={handleVerify}>
          인증하기
        </button>
      </div>

      <button
        className={`btn-submit ${
          verified ? "btn-submit-active" : "btn-submit-disabled"
        }`}
        onClick={handleChangePhone}
        disabled={!verified}
      >
        변경 완료
      </button>
    </div>
  );
}
