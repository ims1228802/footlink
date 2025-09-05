import logoHeader from "../../assets/layout/logo_Header.svg";
import google from "../../assets/login/google.svg";
import kakao from "../../assets/login/kakao.svg";
import naver from "../../assets/login/naver.svg";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password, remember });
  };

  return (
    <div>
      <img src={logoHeader} alt="로고" />
      <p>로그인하고 팀을 만나세요.</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
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
