import logoFooter from "../assets/layout/logo_Footer.svg";
import { Link } from "react-router-dom";
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer> 
      <div id="footer">
        <div className="footer-logo">
          <img src={logoFooter} alt="FooterLogo" />
        </div>
        <ul className="footer-menu">
          <li>
            <Link href="...">이용약관</Link>
            <Link href="...">개인정보 처리방침</Link>
            <Link href="...">고객센터1111</Link>
          </li>
        </ul>
        <div className="footer-txt">
          <p>
            풋링크 | 전북특별자치도 전주시 완산구 유연로 220 | 063-123-4567 
          </p>
        </div>
        <div className="footer_txt-copy">
          Copyright © 2025. FootLink All rights reserved.
        </div>
        <ul className="footer-ft">
          <li>
            <div className="footer-ft-name">Chanhee Han</div>
            <div className="footer-ft-list">
              <p>매치등록</p>
              <p>매치조회</p>
              <p>매치결과등록</p>
              <p>매치결과조회</p>
              <p>매치상세</p>
              <p>매치결과상세</p>
            </div>
          </li>
          <li>
            <div className="footer-ft-name">Jisung Lee</div>
            <div className="footer-ft-list">
              <p>팀등록</p>
              <p>팀조회</p>
              <p>팀리스트조회</p>
              <p>팀상세조회</p>
              <p>팀원조회</p>
              <p>팀원모집</p>
            </div>
          </li>
          <li>
            <div className="footer-ft-name">Hyewon Seo</div>
            <div className="footer-ft-list">
              <p>로그인</p>
              <p>회원가입</p>
              <p>마이페이지</p>
              <p>구장리스트조회</p>
              <p>구장등록</p>
              <p>구장상세조회</p>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
}
