import React, { useEffect, useState } from "react";
import "../../css/user/AppliedMatches.css";
import Multiply from "../../assets/icon/Multiply.svg";
import api from "../../hooks/axiosInstance";

export default function AppliedMatches() {
  const [matches, setMatches] = useState([]);
  const [grouped, setGrouped] = useState({});

  const toHHmm = (raw) => {
    const s = String(raw ?? "").trim();
    const m = s.match(/^(\d{1,2}):(\d{2})/); // 앞의 시:분만 잡기
    if (!m) return "00:00";
    return `${m[1].padStart(2, "0")}:${m[2]}`;
  };

  // 날짜/시간 파싱 + 과거 여부
  const getStartDate = (m) => {
    const dateStr = (m.matchDate || "").replace(/\./g, "-").trim();
    const rawTime = (m.matchTime || "00:00").trim();
    const time = rawTime.length === 5 ? rawTime : rawTime.slice(0, 8);
    return new Date(`${dateStr}T${time}`);
  };
  const isUpcoming = (m) => {
    const start = getStartDate(m);
    return !isNaN(start.getTime()) && start >= new Date();
  };

  // 상태 계산(이전 로직 그대로 사용 가능) ...
  const getMatchStatus = (m) => {
    const cur = Number(m.currentCount ?? 0);
    const total = Number(m.totalCount ?? 0);
    const start = getStartDate(m);
    const now = new Date();
    const oneHourMs = 60 * 60 * 1000;

    if (!isNaN(start.getTime()) && now >= start)
      return { key: "closed", label: "마감" };
    if (total > 0 && cur >= total) return { key: "closed", label: "마감" };

    if (!total || total <= 0) {
      if (!isNaN(start.getTime()) && start - now <= oneHourMs)
        return { key: "urgent", label: "마감임박" };
      return { key: "open", label: "모집중" };
    }

    const left = total - cur;
    if (start - now <= oneHourMs || left <= 2 || left / total <= 0.2)
      return { key: "urgent", label: "마감임박" };
    return { key: "open", label: "모집중" };
  };

  const groupByDate = (data) => {
    const g = data.reduce((acc, m) => {
      const d = m.matchDate;
      if (!acc[d]) acc[d] = [];
      acc[d].push(m);
      return acc;
    }, {});
    setGrouped(g);
  };

  // ✅ 목록 로드 시 과거 경기 제거
  const fetchMatches = async () => {
    try {
      const { data } = await api.get("/applied-matches");
      const upcoming = data.filter(isUpcoming); // ← 여기서 지난 경기 제거
      setMatches(upcoming);
      groupByDate(upcoming);
    } catch (err) {
      console.error("매치 정보 불러오기 실패:", err);
    }
  };

  // 취소 시에도 동일 필터 재적용
  const handleCancel = async (matchNo) => {
    if (!window.confirm("이 경기를 신청 취소하시겠습니까?")) return;
    try {
      await api.delete(`/applied-matches/${matchNo}`);
      const updated = matches.filter((m) => m.matchNo !== matchNo);
      const upcoming = updated.filter(isUpcoming);
      setMatches(upcoming);
      groupByDate(upcoming);
      alert("신청이 취소되었습니다.");
    } catch (err) {
      console.error("신청 취소 실패:", err);
      alert("신청 취소 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="applied-container">
      <div className="applied-title">신청한 매치</div>
      {Object.keys(grouped).length === 0 ? (
        <div className="no-match">표시할 예정 매치가 없습니다.</div>
      ) : (
        Object.entries(grouped).map(([date, list]) => (
          <div key={date} className="applied-date-group">
            <div className="applied-date">{date}</div>
            <ul className="applied-list">
              {list.map((m) => {
                const status = getMatchStatus(m);
                return (
                  <li key={m.matchNo} className="applied-card">
                    <div className="applied-left">
                      <div className="applied-time">
                        <span className="time">{toHHmm(m.matchTime)}</span>
                        <span className={`status ${status.key}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="applied-info">
                        <div className="stadium">{m.stadium}</div>
                        <div className="meta">
                          {m.genderNm} · {m.matchTypeNm} · 레벨 {m.minLevel}~
                          {m.maxLevel}
                        </div>
                      </div>
                    </div>
                    <div className="applied-right">
                      <div className="recruit">
                        모집현황: {m.currentCount ?? 0} /{" "}
                        {m.totalCount}
                      </div>
                      <button
                        className="applied-cancel"
                        onClick={() => handleCancel(m.matchNo)}
                        title="신청 취소"
                        aria-label="신청 취소"
                      >
                        <img src={Multiply} alt="" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
