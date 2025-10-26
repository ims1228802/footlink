import React, { useState, useEffect, useRef } from "react";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import { Link, useNavigate } from "react-router-dom";
import "../../css/user/FindPassword.css";

export default function FindPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // 타이머 관리
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(180);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleRequestVerification = () => {
    if (!phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    startTimer();
    alert("인증번호가 전송되었습니다.");
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      clearInterval(timerRef.current);
      setIsVerified(true);
      alert("인증이 완료되었습니다!");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  const handleNext = () => {
    if (!isVerified) {
      alert("휴대폰 인증을 완료해주세요.");
      return;
    }
    navigate("/find-Password-Next");
  };

  return (
    <div className="findpassword-container">
      <form className="findpassword-form">
        <Link to="/login" className="findpassword-backlink">
          <img
            src={ArrowBackIos}
            alt="로그인으로 돌아가기"
            className="findpassword-backicon"
          />
        </Link>

        <h2 className="findpassword-title">비밀번호 찾기</h2>
        <div className="findpassword-description">
          비밀번호 재설정을 위해
          <br />
          이메일과 휴대폰 번호를 입력해주세요.
        </div>

        {/* 이메일 입력 */}
        <div className="findpassword-emailbox">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="findpassword-emailinput"
          />
        </div>

        {/* 휴대폰 입력 */}
        <div className="findpassword-phonebox">
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요 (- 없이 숫자만)"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 11))
            }
            className="findpassword-phoneinput"
          />
          <button
            type="button"
            onClick={handleRequestVerification}
            className="findpassword-sendbtn"
            disabled={phone.length !== 11}
          >
            {timeLeft > 0 ? "재전송" : "인증요청"}
          </button>
        </div>

        {/* 인증번호 입력 */}
        <div className="findpassword-verifybox">
          <div className="findpassword-verifyinputwrap">
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(
                  e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                )
              }
              className="findpassword-verifyinput"
            />
            {timeLeft > 0 && (
              <span className="findpassword-timer">{formatTime(timeLeft)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleVerifyCode}
            className="findpassword-verifybtn"
            disabled={verificationCode.length !== 6 || timeLeft === 0}
          >
            인증확인
          </button>
        </div>

        {/* 다음 버튼 */}
        <button
          type="button"
          disabled={!isVerified}
          onClick={handleNext}
          className="findpassword-nextbtn"
        >
          다음
        </button>
      </form>
    </div>
  );
}
