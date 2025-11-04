import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../layout/Layout";
import Game from "../../assets/icon/Game.svg";
import StarRate from "../../assets/icon/StarRate.svg";
import History from "../../assets/icon/History.svg";
import profile from "../../assets/user/profile.svg";

import {
  ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import "../../css/user/PublicUserInfo.css";

const COLORS = ["#60BA9E", "#EDA77E", "#D8D8D8"]; // 승/패/무

export default function PublicUserInfo() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const alertedRef = useRef(false);

  const [pub, setPub] = useState({
    profileImageUrl: "",
    basic: { level: null, position: "", region: "", nickname: "" }, // level: null이면 비공개/미등록
    social: { games: 0, mvp: 0, lastActivityDays: null },
    teams: [],
    stats: { win: 0, lose: 0, draw: 0 },
    intro: "",
    email: "",
  });

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/public/${encodeURIComponent(id)}`, {
          headers: { Accept: "application/json" },
          signal: ctrl.signal,
        });

        if (res.status === 404) {
          setIsPrivate(true);
          if (!alertedRef.current) {
            alertedRef.current = true;
            window.alert("비공개 프로필이거나 사용자를 찾을 수 없습니다.");
          }
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();

        // 백엔드에서 is_level_hidden=1이면 level을 NULL로 내려주도록 구성
        setPub({
          profileImageUrl: d.profileImageUrl ?? "",
          basic: {
            level: d.level ?? null,
            position: d.position ?? "",
            region: d.region ?? "",
            nickname: d.nickname ?? "",
          },
          social: { games: 0, mvp: 0, lastActivityDays: null },
          teams: Array.isArray(d.teams) ? d.teams : [],
          stats: { win: 0, lose: 0, draw: 0 },
          intro: d.intro ?? "",
          email: "",
        });
      } catch (e) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [id]);

  const matchStats = useMemo(() => {
    const total = (pub.stats.win || 0) + (pub.stats.lose || 0) + (pub.stats.draw || 0);
    return { total, mvpCount: pub.social.mvp || 0, lastActivity: pub.social.lastActivityDays };
  }, [pub.stats.win, pub.stats.lose, pub.stats.draw, pub.social.mvp, pub.social.lastActivityDays]);

  const chartData = useMemo(
    () => [
      { name: "승", value: pub.stats.win || 0 },
      { name: "패", value: pub.stats.lose || 0 },
      { name: "무", value: pub.stats.draw || 0 },
    ],
    [pub.stats.win, pub.stats.lose, pub.stats.draw]
  );

  const winRate = useMemo(() => {
    const t = matchStats.total || 0;
    return t > 0 ? Math.round(((pub.stats.win || 0) / t) * 100) : 0;
  }, [matchStats.total, pub.stats.win]);

  if (loading) return null;

  // 비공개/미존재 전용 화면
  if (isPrivate) {
    return (
      <Layout>
        <div className="pwrap-private">
          <div className="pprivate-card">
            <div className="pprivate-icon" aria-hidden="true">🔒</div>
            <h3 className="pprivate-title">비공개 프로필입니다</h3>
            <p className="pprivate-desc">소유자가 프로필을 비공개로 설정했거나 존재하지 않는 사용자입니다.</p>
            <div className="pprivate-actions">
              <a className="pbtn pbtn--ghost" href="/main">메인으로 가기</a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 공개 화면
  return (
    <Layout>
      <div className="pwrap">
        {/* 사이드바 */}
        <aside className="pside">
          <div className="pside-top">
            <img
              src={pub.profileImageUrl || profile}
              alt="프로필"
              className="pside-avatar"
              onError={(e) => (e.currentTarget.src = profile)}
            />
            <div className="pside-info">
              <h3 className="pside-name">{pub.basic.nickname || "사용자"}</h3>
            </div>
          </div>
          <hr className="pside-sep" />
        </aside>

        {/* 본문 */}
        <div className="pinfo-container public-readonly">
          <div className="pinfo-header"><h2 className="pinfo-title"></h2></div>

          {/* 소셜 매치 */}
          <section className="pinfo-stats-section">
            <h4 className="pinfo-section-title">소셜매치</h4>
            <ul className="pinfo-stats-list">
              <li className="pinfo-stats-item">
                <div className="pinfo-stats-icon-label">
                  <img src={Game} alt="경기" className="pinfo-stats-icon" />
                  <div className="pinfo-stats-label">경기</div>
                </div>
                <div className="pinfo-stats-value">{matchStats.total || "-"} 회</div>
              </li>
              <li className="pinfo-stats-item">
                <div className="pinfo-stats-icon-label">
                  <img src={StarRate} alt="MVP" className="pinfo-stats-icon" />
                  <div className="pinfo-stats-label">MVP</div>
                </div>
                <div className="pinfo-stats-value">{matchStats.mvpCount || "-"} 회</div>
              </li>
              <li className="pinfo-stats-item">
                <div className="pinfo-stats-icon-label">
                  <img src={History} alt="최근활동" className="pinfo-stats-icon" />
                  <div className="pinfo-stats-label">최근활동</div>
                </div>
                <div className="pinfo-stats-value">
                  {matchStats.lastActivity != null ? `${matchStats.lastActivity} 일전` : "- 일전"}
                </div>
              </li>
            </ul>
          </section>

          {/* 기본정보 + 그래프 */}
          <section className="pinfo-basic-section">
            <h4 className="pinfo-section-title">기본정보</h4>
            <div className="pinfo-separator">
              {/* 좌: 기본정보 */}
              <div className="pinfo-graph-left">
                <div className="pinfo-basic-grid">
                  {/* 레벨: 스샷처럼 한 줄로 “비공개” 표시 */}
                  <div className="pinfo-basic-row">
                    <p className="pinfo-basic-label">레벨</p>
                    {pub.basic.level == null ? (
                      <p className="pinfo-basic-secret">비공개</p>
                    ) : pub.basic.level ? (
                      <p className="pinfo-basic-value">{pub.basic.level}</p>
                    ) : (
                      <div className="pinfo-empty-field"><span>등록된 내역이 없습니다.</span></div>
                    )}
                  </div>

                  <div className="pinfo-basic-row">
                    <p className="pinfo-basic-label">포지션</p>
                    {pub.basic.position ? (
                      <p className="pinfo-basic-value">{pub.basic.position}</p>
                    ) : (
                      <div className="pinfo-empty-field"><span>등록된 내역이 없습니다.</span></div>
                    )}
                  </div>

                  <div className="pinfo-basic-row">
                    <p className="pinfo-basic-label">지역</p>
                    <p className="pinfo-basic-value">{pub.basic.region || "-"}</p>
                  </div>

                  <div className="pinfo-basic-row">
                    <p className="pinfo-basic-label">소속팀</p>
                    {pub.teams?.length ? (
                      <ul className="pinfo-team-list">
                        {pub.teams.map((t, i) => (
                          <li key={i} className="pinfo-basic-value">{t.teamNm}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="pinfo-basic-value pinfo-no-team">소속된 팀이 없습니다.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 우: 승률 그래프 */}
              <div className="pinfo-graph-right">
                {matchStats.total > 0 ? (
                  <div className="pinfo-chart-wrapper">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          cx="50%" cy="50%"
                          innerRadius={60} outerRadius={80}
                          startAngle={90} endAngle={450}
                          paddingAngle={2}
                        >
                          {chartData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend verticalAlign="top" align="center" iconType="circle" iconSize={8} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pinfo-chart-center">
                      <motion.p className="pinfo-chart-number">
                        승률 <motion.span>{winRate}</motion.span>%
                      </motion.p>
                      <p className="pinfo-chart-label">{matchStats.total}경기</p>
                    </div>
                  </div>
                ) : (
                  <div className="pinfo-chart-empty">
                    <p>통계 데이터가 없습니다.</p>
                    <p className="pinfo-chart-empty-sub">첫 경기를 시작해보세요!</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 자기소개 */}
          <section className="pinfo-intro-section">
            <h4 className="pinfo-section-title">자기소개</h4>
            <p className="pinfo-intro-text">{pub.intro || "자기소개가 없습니다."}</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
