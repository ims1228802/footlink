import logoFooter from "../assets/layout/logo_Footer.svg";
import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-m1">
          {/* 상단 로고 */}
          <div className="footer-top">
            <div className="footer-logo">
              <img src={logoFooter} alt="Footer Logo" />
            </div>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="#" className="footer-link">
                  이용약관
                </Link>
                |
                <Link to="#" className="footer-link">
                  개인정보 처리방침
                </Link>
                |
                <Link to="#" className="footer-link">
                  고객센터
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 정보 */}
          <div className="footer-info">
              풋링크 | 전북특별자치도 전주시 완산구 유연로 220 | 063-123-4567
          </div>

          {/* 저작권 */}
          <div className="footer-copy">
            Copyright © 2025. FootLink All rights reserved.
          </div>
        </div>
        <div className="footer-m2">
          {/* 하단 개발자 섹션 */}
          <ul className="footer-team">
            <li className="footer-member">
              <div className="footer-member-name">Chanhee Han</div>
              <div className="footer-member-list">
                <p>매치등록</p>
                <p>매치조회</p>
                <p>매치결과등록</p>
                <p>매치결과조회</p>
                <p>매치상세</p>
                <p>매치결과상세</p>
              </div>
            </li>

            <li className="footer-member">
              <div className="footer-member-name">Jisung Lee</div>
              <div className="footer-member-list">
                <p>팀등록</p>
                <p>팀조회</p>
                <p>팀리스트조회</p>
                <p>팀상세조회</p>
                <p>팀원조회</p>
                <p>팀원모집</p>
              </div>
            </li>

            <li className="footer-member">
              <div className="footer-member-name">Hyewon Seo</div>
              <div className="footer-member-list">
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
      </div>
    </footer>
  );
}
