import React, { useState, useEffect } from "react";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import { Link } from "react-router-dom";

export default function FindEmail() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState(""); // 실제 발송된 코드 (예시용)
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 3분

  // 타이머 효과
  useEffect(() => {
    let interval;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendCode = () => {
    if (!phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    const generatedCode = "123456";
    setSentCode(generatedCode);
    setIsCodeSent(true);
    setTimer(180);
    alert("인증번호가 전송되었습니다. (예: 123456)");
  };

  const handleVerify = () => {
    if (code === sentCode) {
      setIsVerified(true);
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      <Link to="/login">
        <img src={ArrowBackIos} alt="로그인으로 돌아가기" />
      </Link>
      <h2>이메일 찾기</h2>
      <p>
        본인 확인을 위해
        <br />
        휴대폰 번호를 입력해 주세요.
      </p>

      <div>
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요 (- 없이 숫자만)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isCodeSent}
        />
        <button onClick={handleSendCode}>인증요청</button>
      </div>

      {isCodeSent && (
        <div>
          <input
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <span>{formatTime(timer)}</span>
          <button onClick={handleVerify}>인증확인</button>
        </div>
      )}

      <button disabled={!isVerified}>다음</button>
    </div>
  );
}
