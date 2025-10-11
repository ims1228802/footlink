import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import districts from "../../data/districts";
import "../../css/user/Modify.css";
import { useUser } from "../../hooks/useUser";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import profilePlaceholder from "../../assets/user/profile.svg";
import Edit from "../../assets/icon/Edit_Pencil.svg";
import axiosInstance from "../../hooks/axiosInstance";

export default function Modify() {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  // 기본값 세팅
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [previewImg, setPreviewImg] = useState(profilePlaceholder);
  const [selectedFile, setSelectedFile] = useState(null);

  // 주 포지션 & 능력 기본값
  const [mainAbility, setMainAbility] = useState("공격"); // 기본값
  const [mainPosition, setMainPosition] = useState("공격수"); // 기본값

  // 지역 기본값
  const [selectedCity, setSelectedCity] = useState("서울특별시");
  const [selectedDistrict, setSelectedDistrict] = useState("강남구");

  useEffect(() => {
    if (user) {
      setPreviewImg(
        user.profile
          ? `http://localhost:80${user.profile}` // 백엔드 파일 경로
          : profilePlaceholder
      );
      setName(user.name || "");
      setIntro(user.intro || "");
      setMainAbility(user.mainAbility || "공격");
      setMainPosition(user.mainPosition || "공격수");
      setSelectedCity(user.city || "서울특별시");
      setSelectedDistrict(user.district || "강남구");
    }
  }, [user]);

  if (isLoading) return <div>로딩 중...</div>;

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImg(imageUrl);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              name,
              intro,
              pstAblty: mainAbility,
              pst: mainPosition,
              addr: `${selectedCity} ${selectedDistrict}`,
            }),
          ],
          { type: "application/json" }
        )
      );

      // 파일이 있을 경우에만 추가
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await axiosInstance.put("/modify", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ 정보 수정 완료");
      navigate("/user/my-info");
    } catch (err) {
      toast.error("❌ 수정 실패");
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/user/my-info"); // 취소 시 이동
  };

  // 시/도 목록
  const cityList = Object.keys(districts);
  // 시/군/구 목록
  const districtList = selectedCity ? districts[selectedCity] : [];


  return (
    <Layout>
      <motion.div
        className="modify-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ overflow: "hidden" }}
      >
        {/* 프로필 영역 */}
        <div className="modify-profile">
          <div className="profile-wrapper">
            <img src={previewImg} alt="Profile" className="profile-img" />
            <label className="profile-upload-btn">
              <img src={Edit} alt="upload" className="upload" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                hidden
              />
            </label>
          </div>
          <p className="profile-guide">Set your profile image.</p>
        </div>

        {/* 이름 */}
        <div className="modify-field modify-name">
          <label className="modify-label name">이름</label>
          <input
            className="modify-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        {/* 주 포지션 능력 */}
        <div className="modify-field">
          <label className="modify-label">주 포지션능력</label>
          <div className="position-selector">
            {["공격", "밸런스", "수비"].map((type) => (
              <button
                key={type}
                type="button"
                className={`position-btn ${
                  mainAbility === type ? "active" : ""
                }`}
                onClick={() => setMainAbility(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 주 포지션 */}
        <div className="modify-field">
          <label className="modify-label">주 포지션</label>
          <div className="position-selector">
            {["공격수", "미드필더", "수비수", "골키퍼"].map((pos) => (
              <button
                key={pos}
                type="button"
                className={`position-btn ${
                  mainPosition === pos ? "active" : ""
                }`}
                onClick={() => setMainPosition(pos)}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        {/* 지역 */}

        <div className="modify-field modify-region">
          <div className="region-select-group">
            <label className="modify-label">주로 활동하는 지역</label>
            <div className="spacer">
              <div className="region-select-group">
                <label className="modify-label-city">도시</label>
                <select
                  className="modify-select"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedDistrict(""); // 시/도 바뀌면 구/군 초기화
                  }}
                >
                  <option value="">시/도를 선택하세요</option>
                  {cityList.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="region-select-group">
                <label className="modify-label-city">지역</label>
                <select
                  className="modify-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedCity}
                >
                  <option value="">시/군/구를 선택하세요</option>
                  {districtList.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 자기소개 */}
        <div className="modify-field">
          <label className="modify-label">자기소개</label>
          <textarea
            className="modify-textarea"
            placeholder="자기소개를 입력하세요"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>

        {/* 버튼 그룹 */}
        <div className="modify-btn-group">
          <motion.button
            className={`modify-save-btn ${isSaving ? "loading" : ""}`}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "저장 중..." : "저장하기"}
          </motion.button>

          <motion.button
            className="modify-cancel-btn"
            whileTap={{ scale: 0.97 }}
            onClick={handleCancel}
          >
            취소하기
          </motion.button>
        </div>
      </motion.div>
    </Layout>
  );
}
