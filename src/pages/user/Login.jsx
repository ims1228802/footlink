import logoHeader from "../assets/layout/logo_Header.svg";
import google from "../assets/login/google.svg";
import kakao from "../assets/login/kakao.svg";
import naver from "../assets/login/naver.svg";

export default function Login() {
  return (
    <div>
      <div className="logoTitle">
        <div className="logo">
          <img src={logoHeader} alt="HeaderLogo" />
        </div>
        <div className="title">
          <p>로그인하고 팀을 만나세요</p>
        </div>
      </div>
      <div className="email-login-form">
        <form className="login">
          <div className="email">
            <input placeholder="이메일을 입력해주세요" type="email" />
          </div>
          <div className="password">
            <input placeholder="비밀번호를 입력해주세요" type="password" />
          </div>
          <button type="submit" className="loginButton">
            로그인
          </button>
          <div>
            <a href="회원가입링크">
              <button type="button" className="회원가입">
                회원가입
              </button>
            </a>
          </div>
          <div className="찾기">
            <a href="아이디찾기링크">아이디 찾기</a>
            <a href="비밀번호찾기링크">비밀번호 찾기</a>
          </div>
        </form>
        <button>
          {google}
          {kakao}
          {naver}
        </button>
      </div>
    </div>
  );
}
