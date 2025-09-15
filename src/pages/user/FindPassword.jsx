import React, { useState, useEffect } from "react";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import { Link } from "react-router-dom";

export default function FindPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 3분

  // 타이머 작동
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

  // 타이머 형식 변환
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
    const generatedCode = "123456"; // 실제에서는 서버에서 받아야 함
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
      <h2>비밀번호 찾기</h2>
      <p>
        비밀번호 재설정을 위해 <br />
        가입시 입력한 이메일 정보와 휴대폰 번호를 입력해주세요.
      </p>

      <div>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <input
            type="tel"
            placeholder="휴대폰 번호 (- 없이)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isCodeSent}
          />
          <button onClick={handleSendCode}>인증요청</button>
        </div>
      </div>

      {isCodeSent && (
        <div>
          <input
            type="text"
            placeholder="인증번호 입력"
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
