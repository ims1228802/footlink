import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../hooks/axiosInstance";
import "../../css/user/UserLevel.css";
import Layout from "../../layout/Layout";

export default function UserLevel() {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  const levels = [
    { id: 1, name: "비기너1", desc: "축구를 처음 배우는 단계예요.", color: "#00E58A" },
    { id: 2, name: "비기너2", desc: "기초 기술을 익히는 단계예요.", color: "#00E58A" },
    { id: 3, name: "비기너3", desc: "기본기를 다지고 팀 플레이에 익숙해지는 단계예요.", color: "#00E58A" },
    { id: 4, name: "아마추어1", desc: "기본기가 안정된 단계예요.", color: "#1570FF" },
    { id: 5, name: "아마추어2", desc: "경기 흐름을 이해하기 시작하는 단계예요.", color: "#1570FF" },
    { id: 6, name: "아마추어3", desc: "상황에 맞게 플레이를 조율할 수 있어요.", color: "#1570FF" },
    { id: 7, name: "아마추어4", desc: "팀 내에서 주도적인 역할을 할 수 있어요.", color: "#1570FF" },
    { id: 8, name: "아마추어5", desc: "기술 완성도가 높고 플레이가 안정적이에요.", color: "#1570FF" },
    { id: 9, name: "세미프로1", desc: "전술 이해도가 높고 리딩 능력이 있어요.", color: "#FF4029" },
    { id: 10, name: "세미프로2", desc: "경기 흐름을 주도할 수 있어요.", color: "#FF4029" },
    { id: 11, name: "세미프로3", desc: "리그 경기에 적응할 수 있는 수준이에요.", color: "#FF4029" },
    { id: 12, name: "프로", desc: "전문 선수 수준의 경기력을 갖췄어요.", color: "#212121" },
  ];

  const handleLevelSelect = (id) => {
    setSelected(id);
  };

  const handleSubmit = async () => {
    const selectedLevel = levels[selected - 1].name;
    const email = sessionStorage.getItem("email");

    try {
      await api.post("/myinfo/updateLevel", { email, level: selectedLevel });
      navigate("/user/my-info"); 
    } catch (err) {
      console.error("레벨 변경 실패:", err);
      alert("❌ 변경 실패. 다시 시도해주세요.");
    }
  };

  return (
    <Layout>
      <div className="userlevel-container">
        <div className="userlevel-header">
          <h4 className="userlevel-header-title">내 실력 설정하기</h4>
          <div className="userlevel-header-sub">평균 실력을 알려주세요</div>
        </div>

        <div className="userlevel-section">
          <div className="userlevel-info">
            <div className="userlevel-info-name">{levels[selected - 1].name}</div>
            <div className="userlevel-info-desc">{levels[selected - 1].desc}</div>
          </div>

          <div className="userlevel-select">
            {levels.map((lvl) => (
              <div
                key={lvl.id}
                className="userlevel-select-box"
                style={{
                  backgroundColor: selected >= lvl.id ? lvl.color : "#EAEAEA",
                }}
                onClick={() => handleLevelSelect(lvl.id)}
              />
            ))}

            <div className="userlevel-line">
              <div className="userlevel-line-beginner"></div>
              <div className="userlevel-line-amateur"></div>
              <div className="userlevel-line-semi"></div>
              <div className="userlevel-line-pro"></div>
            </div>
          </div>
        </div>

        {/* ✅ 선택 완료 버튼 */}
        <div className="userlevel-btn" onClick={handleSubmit}>
          선택 완료
        </div>
      </div>
    </Layout>
  );
}
