import React from "react";
import appliedMatches from "../../data/appliedMatches";
import "../../css/user/AppliedMatches.css";
import Multiply from "../../assets/icon/Multiply.svg";

export default function AppliedMatches() {

  // 날짜별 그룹화
  const groupByDate = appliedMatches.reduce((acc, match) => {
    if (!acc[match.date]) acc[match.date] = [];
    acc[match.date].push(match);
    return acc;
  }, {});

  return (
 <div className="applied-container">
      <h3 className="applied-title">신청한 매치</h3>

      {Object.entries(groupByDate).map(([date, matches]) => (
        <div key={date} className="applied-date-group">
          <h4 className="applied-date">{date}</h4>

          <ul className="applied-list">
            {matches.map((m) => (
              <li key={m.id} className="applied-card">
                <div className="applied-time">{m.time}</div>

                <div className="applied-info">
                  <p className="applied-stadium">{m.stadium}</p>
                  <div className="applied-meta">
                    <span>{m.gender}</span>
                    <span className="divider">|</span>
                    <span>{m.type}</span>
                    <span className="divider">|</span>
                    <span>모집현황: {m.recruitStatus}</span>
                  </div>
                </div>

                <div className={`applied-status ${m.status}`}>{m.status}</div>

                <button className="applied-cancel">
                  <img src={Multiply} alt="신청취소" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}