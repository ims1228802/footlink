import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import KeyboardArrowDown from "../../assets/icon/KeyboardArrowDown.svg";
import "../../css/user/SignUp.css";
import districts from "../../data/districts";
import usePhoneVerification from "../../hooks/usePhoneVerification";
import useVerifyCode from "../../hooks/useVerifyCode";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "남자",
    phone: "",
    verificationCode: "",
    city: "",
    district: "",
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "agreeAll") {
      setForm({
        ...form,
        agreeAll: checked,
        agreeTerms: checked,
        agreePrivacy: checked,
        agreeMarketing: checked,
      });
    } else {
      let newValue = type === "checkbox" ? checked : value;

      if (name === "phone") {
        newValue = newValue.replace(/[^0-9]/g, "").slice(0, 11);
      }
      const updated = {
        ...form,
        [name]: newValue,
      };

      updated.agreeAll =
        updated.agreeTerms && updated.agreePrivacy && updated.agreeMarketing;

      setForm(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // birthYear, birthMonth, birthDay → birth(YYYY-MM-DD)로 합치기
    const birth = `${form.birthYear}-${form.birthMonth.padStart(
      2,
      "0"
    )}-${form.birthDay.padStart(2, "0")}`;

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const payload = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      name: form.name,
      phone: form.phone,
      birth, // ✅ 하나로 합쳐진 값
      gender: form.gender,
      city: form.city,
      district: form.district,
    };

    try {
      const res = await fetch(`http://localhost/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("회원가입 성공!");
      } else {
        const errMsg = await res.text();
        alert("회원가입 실패: " + errMsg);
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 실패");
    }
  };

  // hooks
  const { requestVerification, loading } = usePhoneVerification();
  const { verifyCode } = useVerifyCode();

  // timer
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간(초)
  const timerRef = useRef(null);

  // 타이머 시작 함수
  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(180); // 3분
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

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // 인증번호 요청
  const handleRequestVerification = async () => {
    if (!form.phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    const result = await requestVerification(form.phone);
    if (!result?.exists) {
      startTimer(); // ✅ 타이머 시작
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    const success = await verifyCode(form.phone, form.verificationCode);
    if (success) {
      clearInterval(timerRef.current);
      setTimeLeft(0);
    }
  };

  // 시간 포맷 (MM:SS)
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <Link to="/login" className="back-link">
          <img
            src={ArrowBackIos}
            alt="로그인으로 돌아가기"
            className="back-icon"
          />
        </Link>
        <h2 className="form-title">회원가입</h2>

        <h3 className="section-title">기본정보</h3>
        <div className="select-group">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="signup-input"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="signup-input"
            placeholder="비밀번호를 입력해주세요"
            maxLength={15}
            value={form.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword" className="form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="signup-input"
            placeholder="비밀번호를 다시 입력해주세요"
            maxLength={15}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="name" className="form-label">
            이름
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="signup-input"
            placeholder="이름을 입력해주세요"
            value={form.name}
            onChange={handleChange}
            required
          />
          <div className="birth-group">
            <label className="form-label">생년월일</label>
            <div className="birth-inputs">
              <input
                type="text"
                name="birthYear"
                className="input-birth"
                placeholder="YYYY"
                value={form.birthYear}
                onChange={handleChange}
                maxLength={4}
                inputMode="numeric"
                pattern="\d*"
              />
              <input
                type="text"
                name="birthMonth"
                className="input-birth"
                placeholder="MM"
                value={form.birthMonth}
                onChange={handleChange}
                maxLength={2}
                inputMode="numeric"
                pattern="\d*"
              />
              <input
                type="text"
                name="birthDay"
                className="input-birth"
                placeholder="DD"
                value={form.birthDay}
                onChange={handleChange}
                maxLength={2}
                inputMode="numeric"
                pattern="\d*"
              />
            </div>
          </div>

          <div className="gender-group">
            <label className="form-label">성별</label>
            <div className="gender-toggle">
              <input
                id="male"
                type="radio"
                name="gender"
                value="남자"
                checked={form.gender === "남자"}
                onChange={handleChange}
              />
              <label htmlFor="male">남자</label>
              <input
                id="female"
                type="radio"
                name="gender"
                value="여자"
                checked={form.gender === "여자"}
                onChange={handleChange}
              />
              <label htmlFor="female">여자</label>
            </div>
          </div>

          {/* 휴대폰번호 */}
          <div className="phone-group">
            <label className="form-label">휴대폰번호</label>
            <div className="input-with-button">
              <input
                type="tel"
                name="phone"
                className="input-phone"
                placeholder="휴대폰 번호를 입력해주세요 ( - 제외 )"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/[^0-9]/g, "").slice(0, 11),
                  })
                }
                maxLength={11}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={handleRequestVerification}
                disabled={loading || form.phone.length !== 11}
              >
                {timeLeft > 0 ? "재전송" : "인증요청"}
              </button>
            </div>
          </div>

          {/* 인증번호 */}
          <div className="verify-group">
            <label className="form-label">인증번호</label>
            <div className="input-with-button">
              <div className="input-verify-wrapper">
                <input
                  type="text"
                  name="verificationCode"
                  className="input-verify"
                  placeholder="인증번호 입력해주세요"
                  value={form.verificationCode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      verificationCode: e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 6),
                    })
                  }
                  maxLength={6}
                />
                {/* 남은 시간 표시 */}
                {timeLeft > 0 && (
                  <span className="verify-timer">{formatTime(timeLeft)}</span>
                )}
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleVerifyCode}
                disabled={
                  loading ||
                  form.verificationCode.length !== 6 ||
                  timeLeft === 0
                }
              >
                인증확인
              </button>
            </div>
          </div>
        </div>

        {/* 추가정보 */}
        <div className="select-group">
          <h3 className="section-title">추가정보</h3>
          <p className="form-label region">
            주로 활동하는 지역을 선택해주세요.
          </p>
          <div className="select-row">
            <div className="address-group">
              <select
                name="city"
                className="select-field"
                value={form.city}
                onChange={handleChange}
              >
                <option value="">시/도 선택</option>
                {Object.keys(districts).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <img src={KeyboardArrowDown} alt="arrow" className="arrow-icon" />
            </div>
            <div className="address-group">
              <select
                name="district"
                className="select-field"
                value={form.district}
                onChange={handleChange}
              >
                <option value="">시/군/구 선택</option>
                {districts[form.city]?.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <img src={KeyboardArrowDown} alt="arrow" className="arrow-icon" />
            </div>
          </div>
        </div>

        {/* 이용약관 동의 */}
        <div className="terms-section">
          <h3 className="section-title">이용약관 동의</h3>
          <div className="select-group terms-group">
            <div className="terms-section__item">
              <label className="terms-section__label">
                <input
                  type="checkbox"
                  name="agreeAll"
                  checked={form.agreeAll}
                  onChange={handleChange}
                />
                전체 동의
              </label>
            </div>
            <hr className="terms-divider" />
            <div className="terms-section__item">
              <label className="terms-section__label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                />
                [필수] 이용약관 동의
              </label>
              <button
                type="button"
                className="terms-section__button"
                onClick={() => openModal("이용약관 전문 내용")}
              >
                보기
              </button>
            </div>

            <div className="terms-section__item">
              <label className="terms-section__label">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={form.agreePrivacy}
                  onChange={handleChange}
                />
                [필수] 개인정보 수집 및 이용 동의
              </label>
              <button
                type="button"
                className="terms-section__button"
                onClick={() => openModal("개인정보 수집 및 이용에 관한 내용")}
              >
                보기
              </button>
            </div>

            <div className="terms-section__item">
              <label className="terms-section__label">
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={form.agreeMarketing}
                  onChange={handleChange}
                />
                [선택] 이벤트 및 혜택 정보 수신
              </label>
              <button
                type="button"
                className="terms-section__button"
                onClick={() => openModal("마케팅 정보 수신 동의 내용")}
              >
                보기
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={!(form.agreeTerms && form.agreePrivacy)}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
