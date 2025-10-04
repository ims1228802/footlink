import React from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import signup_img from "../../assets/user/signup_img.jpg";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <img
          src={signup_img}
          alt="Soccer Player"
          style={{
            height: "300px",
            width: "350px",
            margin: "45px 0px",
            borderRadius: "10px",
          }}
        />
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#00ADB5",
          }}
        >
          환영합니다!
        </h1>
        <p style={{ color: "#555", fontSize: "15px" }}>
          팀을 찾아 첫 경기를 예약해보세요.
        </p>
        <button
          onClick={() => navigate("/match")}
          style={{
            backgroundColor: "#00ADB5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            height: "40px",
            width: "140px",
            margin: "50px 0px",
          }}
        >
          매치 보러가기
        </button>
      </div>
    </Layout>
  );
}
