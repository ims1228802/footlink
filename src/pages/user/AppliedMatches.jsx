import React, { useEffect, useState } from "react";
import "../../css/user/AppliedMatches.css";
import Multiply from "../../assets/icon/Multiply.svg";
import api from "../../hooks/axiosInstance";

export default function AppliedMatches() {
  const [matches, setMatches] = useState([]);
  const [groupedMatches, setGroupedMatches] = useState({});

  // ✅ 신청 경기 불러오기
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/myinfo/applied-matches");
        setMatches(data);
        groupByDate(data);
      } catch (err) {
        console.error("매치 정보 불러오기 실패:", err);
      }
    })();
  }, []);

  // ✅ 날짜별 그룹화
  const groupByDate = (data) => {
    const grouped = data.reduce((acc, match) => {
      const date = match.matchDate;
      if (!acc[date]) acc[date] = [];
      acc[date].push(match);
      return acc;
    }, {});
    setGroupedMatches(grouped);
  };

  // ✅ 신청 취소 기능
  const handleCancel = async (matchNo) => {
    if (!window.confirm("이 경기를 신청 취소하시겠습니까?")) return;
    try {
      await api.delete(`/myinfo/applied-matches/${matchNo}`);
      alert("신청이 취소되었습니다.");

      const updated = matches.filter((m) => m.matchNo !== matchNo);
      setMatches(updated);
      groupByDate(updated);
    } catch (err) {
      console.error("신청 취소 실패:", err);
      alert("신청 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="applied-container">
      <h3 className="applied-title">신청한 매치</h3>

      {Object.keys(groupedMatches).length === 0 ? (
        <p className="no-match">신청한 매치가 없습니다.</p>
      ) : (
        Object.entries(groupedMatches).map(([date, matches]) => (
          <div key={date} className="applied-date-group">
            <h4 className="applied-date">{date}</h4>

            <ul className="applied-list">
              {matches.map((m) => (
                <li key={m.matchNo} className="applied-card">
                  <div className="applied-left">
                    <div className="applied-time">
                      <span className="time">{m.matchTime}</span>
                      <span className={`status ${m.status || "waiting"}`}>
                        {m.status || "대기중"}
                      </span>
                    </div>

                    <div className="applied-info">
                      <p className="stadium">{m.stadium}</p>
                      <p className="meta">
                        {m.genderNm} | {m.matchTypeCd} | 레벨 {m.minLevel}~{m.maxLevel}
                      </p>
                    </div>
                  </div>

                  <div className="applied-right">
                    <p className="recruit">
                      모집현황: {m.currentCount || 0} / {m.totalCount || "미정"}
                    </p>

                    <button
                      className="applied-cancel"
                      onClick={() => handleCancel(m.matchNo)}
                    >
                      <img src={Multiply} alt="신청취소" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
