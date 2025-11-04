import logoHeader from "../../assets/layout/logo_Header.svg";
import google from "../../assets/login/google.svg";
import kakao from "../../assets/login/kakao.svg";
import naver from "../../assets/login/naver.svg";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "../../css/user/LoginPage.css";
import useForm from "../../hooks/useForm";
import axiosInstance from "../../hooks/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const from = location.state?.from || "/";

  // ✅ 유효성 검사
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

  // ✅ useForm 훅으로 폼 상태 관리
  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    { email: "", password: "", remember: false },
    validate
  );

  // ✅ 페이지 진입 시 localStorage에서 이메일 불러오기
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

  // ✅ 로그인 처리 함수
  const onSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.message === "로그인 성공") {
        const token = response.data.token;
        localStorage.setItem("accessToken", token);

        // ✅ remember 체크 상태에 따라 이메일 저장/삭제
        if (formData.remember) {
          localStorage.setItem("savedEmail", formData.email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        // ✅ React Query 캐시 갱신
        queryClient.invalidateQueries(["user"]);

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
      <img
        src={logoHeader}
        className="logo"
        alt="로고"
        onClick={() => navigate("/main")}
      />
      <p className="login-text">로그인하고 팀을 만나세요.</p>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
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

        {/* 비밀번호 */}
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

        {/* ✅ 아이디 저장 */}
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

        {/* 로그인 버튼 */}
        <button type="submit" className="login-button">
          로 그 인
        </button>

        {/* 링크 그룹 */}
        <div className="link-group">
          <ul className="link-group">
            <li>
              <Link to="/signup" className="link">
                회원가입
              </Link>
            </li>
            <li>
              <Link to="/find-Email" className="link">
                계정 찾기
              </Link>
            </li>
            <li>
              <Link to="/find-Password" className="link">
                비밀번호 찾기
              </Link>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
