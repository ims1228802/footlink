import Game from "../../assets/icon/Game.svg";
import StarRate from "../../assets/icon/StarRate.svg";
import History from "../../assets/icon/History.svg";
import Share from "../../assets/icon/Share.svg";
import Edit from "../../assets/icon/Edit_Pencil.svg";
import React, { useEffect } from "react";
import "../../css/user/MyInfo.css";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion, useSpring, useTransform } from "framer-motion";
import { useUser } from "../../hooks/useUser";

const COLORS = ["#EDA77E", "#60BA9E", "#D8D8D8"]; // 승, 패, 무승 색상

export default function MyInfo() {
  const { data: user, isLoading } = useUser();

  const navigate = useNavigate();

  // 수정 버튼 클릭
  const handleModify = () => {
    navigate("/modify");
  };

  //  유저 데이터가 없을 때(비로그인 상태)
  if (isLoading) return <div className="myinfo-loading">로딩 중...</div>;
  if (!user)
    return <div className="myinfo-require-login">로그인이 필요합니다.</div>;

  // 임시 사용자 데이터 (백엔드에서 받아올 데이터 구조 예시)
  const userData = {
    winCount: 0,
    loseCount: 0,
    drawCount: 0,
    totalGames: 0,
    mvpCount: 0,
    lastActivity: 0,
  };

  const matchStats = userData?.matchStats || {
    mvpCount: userData.mvpCount,
    lastActivity: userData.lastActivity,
    win: userData.winCount,
    lose: userData.loseCount,
    draw: userData.drawCount,
    total: userData.totalGames,
  };

  const winRate = matchStats.total
    ? Math.round((matchStats.win / matchStats.total) * 100)
    : 0;

  const chartData = [
    { name: "승", value: matchStats.win },
    { name: "패", value: matchStats.lose },
    { name: "무", value: matchStats.draw },
  ];

  // 승률 애니메이션
  const count = useSpring(0, { stiffness: 60, damping: 20 });
  const rounded = useTransform(count, (val) => Math.round(val));
  useEffect(() => {
    count.set(winRate);
  }, [winRate, count]);

  return (
    <div className="myinfo-container">
      {/* 상단 헤더 영역 */}
      <div className="myinfo-header">
        <h3 className="myinfo-title">내 정보</h3>
        <div className="myinfo-header-buttons">
          <button className="myinfo-modify-btn" onClick={handleModify}>
            <img src={Edit} alt="수정" />
          </button>
          <button className="myinfo-share-btn">
            <img src={Share} alt="공유하기" />
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <section className="myinfo-stats-section">
        <h4 className="myinfo-section-title">소셜매치</h4>
        <ul className="myinfo-stats-list">
          <li className="myinfo-stats-item">
            <div className="myinfo-stats-icon-label">
              <img src={Game} alt="경기" className="myinfo-stats-icon" />
              <div className="myinfo-stats-label">경기</div>
            </div>
            <div className="myinfo-stats-value">
              {matchStats.total || "-"} 회
            </div>
          </li>
          <li className="myinfo-stats-item">
            <div className="myinfo-stats-icon-label">
              <img src={StarRate} alt="MVP" className="myinfo-stats-icon" />
              <div className="myinfo-stats-label">MVP</div>
            </div>
            <div className="myinfo-stats-value">
              {matchStats.mvpCount || "-"} 회
            </div>
          </li>
          <li className="myinfo-stats-item">
            <div className="myinfo-stats-icon-label">
              <img src={History} alt="최근활동" className="myinfo-stats-icon" />
              <div className="myinfo-stats-label">최근활동</div>
            </div>
            <div className="myinfo-stats-value">
              {matchStats.lastActivity || "-"} 일전
            </div>
          </li>
        </ul>
      </section>

      {/* 기본 정보 */}
      <section className="myinfo-basic-section">
        <h4 className="myinfo-section-title">기본정보</h4>
        <div className="myinfo-separator">
          <div className="myinfo-graph-left">
            <div className="myinfo-basic-grid">
              <div className="myinfo-basic-row">
                <p className="myinfo-basic-label">레벨</p>
                {user.level ? (
                  <p className="myinfo-basic-value">{user.level}</p>
                ) : (
                  <div className="myinfo-empty-field">
                    <span>등록된 내역이 없습니다.</span>
                    <button
                      className="myinfo-register-btn"
                      onClick={() => navigate("/user/user-level")}
                    >
                      등록하기
                    </button>
                  </div>
                )}
              </div>
              <div className="myinfo-basic-row">
                <p className="myinfo-basic-label">포지션</p>
                {user.pst ? (
                  <p className="myinfo-basic-value">{user.pst}</p>
                ) : (
                  <div className="myinfo-empty-field">
                    <span>등록된 내역이 없습니다.</span>
                  </div>
                )}
              </div>
              <div className="myinfo-basic-row">
                <p className="myinfo-basic-label">지역</p>
                <p className="myinfo-basic-value">{user.addr}</p>
              </div>
              <div className="myinfo-basic-row">
                <p className="myinfo-basic-label">소속팀</p>

                {user.teams && user.teams.length > 0 ? (
                  <ul className="myinfo-team-list">
                    {user.teams.map((teams, index) => (
                      <li key={index} className="myinfo-basic-value">
                        {teams.teamNm}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="myinfo-basic-value myinfo-no-team">
                    소속된 팀이 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 승률 차트 */}
          <div className="myinfo-graph-right">
            {matchStats.total > 0 ? (
              <div className="myinfo-chart-wrapper">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={450}
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="top"
                      align="center"
                      iconType="circle"
                      iconSize={8}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="myinfo-chart-center">
                  <motion.p className="myinfo-chart-number">
                    승률 <motion.span>{rounded}</motion.span>%
                  </motion.p>
                  <p className="myinfo-chart-label">{matchStats.total}경기</p>
                </div>
              </div>
            ) : (
              <div className="myinfo-chart-empty">
                <p>통계 데이터가 없습니다.</p>
                <p className="myinfo-chart-empty-sub">
                  첫 경기를 시작해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 자기소개 */}
      <section className="myinfo-intro-section">
        <h4 className="myinfo-section-title">자기소개</h4>
        <p className="myinfo-intro-text">
          {user.intro || "자기소개가 없습니다."}
        </p>
      </section>
    </div>
  );
}
