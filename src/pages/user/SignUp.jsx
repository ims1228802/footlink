import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import KeyboardArrowDown from "../../assets/icon/KeyboardArrowDown.svg";
import "../../css/user/SignUp.css";
import districts from "../../data/districts";
import usePhoneVerification from "../../hooks/usePhoneVerification";

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

  const { requestVerification, loading } = usePhoneVerification();

  const handleChange = (e) => {
    console.log(e.target);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 정보:", form);
  };

  const handleRequestVerification = () => {
    if (!form.phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    requestVerification(form.phone);
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
          <div className="phone-group">
            <label className="form-label">휴대폰번호</label>
            <div className="input-with-button">
              <input
                type="tel"
                name="phone"
                className="input-phone"
                placeholder="휴대폰 번호를 입력해주세요 ( - 제외 )"
                maxLength={11}
                inputMode="numeric"
                pattern="\d*"
                value={form.phone}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={handleRequestVerification}
                disabled={loading || form.phone.length !== 11}
              >
                {loading ? "인증요청" : "인증요청"}
              </button>
            </div>
          </div>
          <div className="verify-group">
            <label className="form-label">인증번호</label>
            <div className="input-with-button">
              <input
                type="text"
                name="verificationCode"
                className="input-verify"
                placeholder="인증번호 입력해주세요"
                maxLength={6}
                value={form.verificationCode}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn-secondary"
                disabled={loading || form.verificationCode.length !== 6}
              >
                인증확인
              </button>
            </div>
          </div>
        </div>

        <div className="select-group">
          <h3 className="section-title">추가정보</h3>
          <p className="form-label region">
            {" "}
            주로 활동하는 지역을 선택해주세요.{" "}
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
