import logoHeader from "../../assets/layout/logo_Header.svg";
import google from "../../assets/login/google.svg";
import kakao from "../../assets/login/kakao.svg";
import naver from "../../assets/login/naver.svg";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../css/user/LoginPage.css";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { useNavigate, useLocation  } from "react-router-dom";
import axiosInstance from "../../hooks/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/';
  // 유효성 검사 함수
  const validate = (values) => {
    const errors = {};
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordRegex = /^.{8,}$/;
    if (!emailRegex.test(values.email)) {
      errors.email = "올바른 이메일을 입력 해주세요";
    }
    if (!passwordRegex.test(values.password)) {
      errors.password = "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    { email: "", password: "", remember: false }, // 초기값
    validate
  );

  // 아이디 저장 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setValues((prev) => ({
        ...prev,
        email: savedEmail,
        remember: true,
      }));
    }
  }, [setValues]);

  // 로그인 요청
  const onSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.message === "로그인 성공") {
        const token = response.data.token;

        localStorage.setItem("accessToken", token);

        // 로그인 성공 후 유저 정보 Redux에 저장
        dispatch(setUser({
          name: response.data.name,  // 서버에서 내려주는 값
          email: formData.email,     // 서버 응답에 email이 있다면 그 값 사용
          img: response.data.img || "/default-profile.png"
        }));
        alert("로그인 성공!");

        navigate(from, { replace: true });
      } else {
        alert("가입된 회원이 없습니다.");
      }
    } catch (error) {
      console.error("❌ 로그인 요청 실패:", error);
      alert("로그인 요청 실패");
    }
  };


  return (
    <div className="login-container">
      <img src={logoHeader} className="logo" alt="로고" onClick={() => navigate("/main")}/>
      <p className="login-text">로그인하고 팀을 만나세요.</p>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          className="login-input"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <input
          type="password"
          name="password"
          className="login-input"
          placeholder="비밀번호를 입력해주세요"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}

        <div className="checkbox-wrapper">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="remember"
              className="checkbox-input"
              checked={values.remember}
              onChange={handleChange}
            />
            <span className="circle"></span>
            아이디 저장
          </label>
        </div>

        <button type="submit" className="login-button">
          로 그 인
        </button>

        <div className="link-group">
          <ul className="link-group">
            <li>
              <Link to="/signup" className="link">
                회원가입
              </Link>
            </li>
            <li>
              <Link to="/FindEmail" className="link">
                계정 찾기
              </Link>
            </li>
            <li>
              <Link to="/FindPassword" className="link">
                비밀번호 찾기
              </Link>
            </li>
          </ul>
        </div>
      </form>

      <div className="social-login">
        <img src={kakao} className="social-icon" alt="카카오 로그인" />
        <img src={google} className="social-icon" alt="구글 로그인" />
        <img src={naver} className="social-icon" alt="네이버 로그인" />
      </div>
    </div>
  );
}
