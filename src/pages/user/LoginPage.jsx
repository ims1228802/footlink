import logoHeader from "../../assets/layout/logo_Header.svg";
import google from "../../assets/login/google.svg";
import kakao from "../../assets/login/kakao.svg";
import naver from "../../assets/login/naver.svg";
import { Link } from "react-router-dom";
import React from "react";
import "../../css/LoginPage.css";
import useForm from "../../hooks/useForm";
// import axios from "axios";

export default function LoginPage() {
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

  const { values, errors, handleChange, handleSubmit ,setValues} = useForm(
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

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        alert("로그인 성공");
      } else {
        alert("가입된 회원이 없습니다");
      }
    } catch (error) {
      alert("로그인요청실패");
    }
  };
  return (
    <div>
      <img src={logoHeader} alt="로고" />
      <p>로그인하고 팀을 만나세요.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="errorMessage">{errors.email}</div>}

        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <div className="errorMessage">{errors.password}</div>
        )}

        <div>
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
            />
            아이디 저장
          </label>
        </div>

        <button type="submit">로그인</button>

        <div>
          <Link to="/signup">회원가입</Link>
          <Link to="/FindEmail">아이디 찾기</Link>
          <Link to="/FindPassword">비밀번호 찾기</Link>
        </div>
      </form>

      <div>
        <img src={kakao} alt="카카오 로그인" />
        <img src={google} alt="구글 로그인" />
        <img src={naver} alt="네이버 로그인" />
      </div>
    </div>
  );
}
