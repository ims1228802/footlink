import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";

export default function SignUpForm() {
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
    city: "서울",
    district: "종로구",
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출된 정보:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/login">
        <img
          src={ArrowBackIos}
          alt="로그인으로 돌아가기"
        />
      </Link>
      <h2>회원가입</h2>

      <h3>기본정보</h3>
      <input
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 다시 입력해주세요"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="text"
        name="name"
        placeholder="이름을 입력해주세요"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br />

      <div>
        <input
          type="text"
          name="birthYear"
          placeholder="YYYY"
          value={form.birthYear}
          onChange={handleChange}
          maxLength={4}
        />
        <input
          type="text"
          name="birthMonth"
          placeholder="MM"
          value={form.birthMonth}
          onChange={handleChange}
          maxLength={2}
        />
        <input
          type="text"
          name="birthDay"
          placeholder="DD"
          value={form.birthDay}
          onChange={handleChange}
          maxLength={2}
        />
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="남자"
            checked={form.gender === "남자"}
            onChange={handleChange}
          />{" "}
          남자
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="여자"
            checked={form.gender === "여자"}
            onChange={handleChange}
          />{" "}
          여자
        </label>
      </div>

      <input
        type="tel"
        name="phone"
        placeholder="휴대폰 번호"
        value={form.phone}
        onChange={handleChange}
      />
      <button type="button">인증요청</button>
      <br />

      <input
        type="text"
        name="verificationCode"
        placeholder="인증번호 입력"
        value={form.verificationCode}
        onChange={handleChange}
      />
      <button type="button">인증확인</button>
      <br />

      <h3>추가정보</h3>
      <select name="city" value={form.city} onChange={handleChange}>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
      </select>

      <select name="district" value={form.district} onChange={handleChange}>
        <option value="종로구">종로구</option>
        <option value="강남구">강남구</option>
        <option value="서초구">서초구</option>
      </select>

      <h3>이용약관 동의</h3>
      <label>
        <input
          type="checkbox"
          name="agreeAll"
          checked={form.agreeAll}
          onChange={handleChange}
        />
        전체 동의
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="agreeTerms"
          checked={form.agreeTerms}
          onChange={handleChange}
        />
        [필수] 이용약관 동의
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="agreePrivacy"
          checked={form.agreePrivacy}
          onChange={handleChange}
        />
        [필수] 개인정보 수집 및 이용 동의
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="agreeMarketing"
          checked={form.agreeMarketing}
          onChange={handleChange}
        />
        [선택] 이벤트 및 혜택 정보 수신
      </label>
      <br />

      <button type="submit">가입하기</button>
    </form>
  );
}
