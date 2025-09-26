import React from "react";
import { useNavigate } from "react-router-dom";
import signup_img from "../../assets/user/signup_img.jpg"; // 저장한 이미지 경로

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleGoToMatch = () => {
    // React Router를 이용해 매치 페이지로 이동
    navigate("/matches");
  };

  return (
    <div className="">
      {/* 이미지 */}
      <img src={signup_img} alt="Soccer Player" className="w-52 mb-6" />

      {/* 텍스트 */}
      <h1 className="">환영합니다!</h1>
      <p className="">팀을 찾아 첫 경기를 예약해보세요.</p>

      {/* 버튼 */}
      <button
        onClick={handleGoToMatch}
        className=""
      >
        매치 보러가기
      </button>
    </div>
  );
}