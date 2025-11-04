import React, { useState, useRef, useEffect } from "react";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import { Link, useNavigate } from "react-router-dom";
import usePhoneVerification from "../../hooks/usePhoneVerification";
import useVerifyCode from "../../hooks/useVerifyCode";
import "../../css/user/FindEmail.css";

export default function FindEmail() {
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const { requestVerification, loading } = usePhoneVerification();
  const { verifyCode } = useVerifyCode();

  // 타이머 시작
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

  // 언마운트 시 정리
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleRequestVerification = async () => {
    if (!phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    const result = await requestVerification(phone);
    if (result) {
      startTimer();
      alert("인증번호가 전송되었습니다.");
    }
  };

  const handleVerifyCode = async () => {
    const success = await verifyCode(phone, verificationCode);
    if (success) {
      clearInterval(timerRef.current);
      setTimeLeft(0);
      setIsVerified(true);
      alert("인증이 완료되었습니다!");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  const handleNext = () => {
    navigate("/find-Email-Next"); // 다음 페이지로 이동
  };

  return (
    <div className="findemail-container">
      <form className="findemail-form">
        <Link to="/login" className="findemail-backlink">
          <img
            src={ArrowBackIos}
            alt="로그인으로 돌아가기"
            className="findemail-backicon"
          />
        </Link>

        <h2 className="findemail-title">이메일 찾기</h2>
        <div className="findemail-description">
          본인 확인을 위해 
          <br /> 
          휴대폰 번호를 입력해 주세요.
        </div>

        {/* 휴대폰 입력 */}
        <div className="findemail-phonebox">
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요 (- 없이 숫자만)"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 11))
            }
            className="findemail-phoneinput"
          />
          <button
            type="button"
            onClick={handleRequestVerification}
            className="findemail-sendbtn"
            disabled={loading || phone.length !== 11}
          >
            {timeLeft > 0 ? "재전송" : "인증요청"}
          </button>
        </div>

        {/* 인증번호 입력 */}
        <div className="findemail-verifybox">
          <div className="findemail-verifyinputwrap">
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(
                  e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                )
              }
              className="findemail-verifyinput"
            />
            {timeLeft > 0 && (
              <span className="findemail-timer">{formatTime(timeLeft)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleVerifyCode}
            className="findemail-verifybtn"
            disabled={
              loading || verificationCode.length !== 6 || timeLeft === 0
            }
          >
            인증확인
          </button>
        </div>

        {/* 다음 버튼 */}
        <button
          type="button"
          disabled={!isVerified}
          onClick={handleNext} 
          className="findemail-nextbtn"
        >
          다음
        </button>
      </form>
    </div>
  );
}
