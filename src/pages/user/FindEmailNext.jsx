import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIos from "../../assets/icon/ArrowBackIos.svg";
import "../../css/user/FindEmailNext.css";

export default function FindEmailNext() {
  return (
    <div className="findemailnext-container">
      <div className="findemailnext-box">
        {/* 뒤로가기 */}
        <Link to="/FindEmail" className="findemailnext-backlink">
          <img
            src={ArrowBackIos}
            alt="이전으로"
            className="findemailnext-backicon"
          />
        </Link>

        {/* 타이틀 */}
        <h2 className="findemailnext-title">이메일 찾기</h2>

        {/* 설명 */}
        <div className="findemailnext-description">
          <div className="findemailnext-desc-line">
            등록된 이메일 계정
          </div>
          <div className="findemailnext-desc-line">
            아래 계정으로 로그인 하실 수 있습니다.
          </div>
        </div>

        {/* 결과박스 */}
        <div className="findemailnext-emailbox">
          <div className="findemailnext-item">
            <div className="findemailnext-label">이메일</div>
            <span className="findemailnext-email">example@email.com</span>
          </div>
          <div className="findemailnext-item">
            <div className="findemailnext-label">가입일</div>
            <div className="findemailnext-date">2025-07-01</div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="findemailnext-btnbox">
          <Link
            to="/login"
            className="findemailnext-btn findemailnext-btn--main"
          >
            로그인하기
          </Link>
          <Link
            to="/FindPassword"
            className="findemailnext-btn findemailnext-btn--sub"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
}
