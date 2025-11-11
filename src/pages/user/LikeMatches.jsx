// src/pages/user/LikeMatches.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../../css/user/LikeMatches.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../../hooks/axiosInstance";

/* =================== helpers (Applied과 동일한 로직) =================== */
const toHHmm = (raw) => {
  const s = String(raw ?? "").trim();
  const m = s.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return "00:00";
  return `${m[1].padStart(2, "0")}:${m[2]}`;
};

function getStartDate(m) {
  const dateStr = (m.matchDate || "").replace(/\./g, "-").trim();
  const rawTime = (m.matchTime || "00:00").trim();
  const time = rawTime.length === 5 ? rawTime : rawTime.slice(0, 8);
  return new Date(`${dateStr}T${time}`);
}
function isUpcoming(m) {
  const start = getStartDate(m);
  return !isNaN(start.getTime()) && start >= new Date();
}
function getMatchStatus(m) {
  const cur = Number(m.currentCount ?? 0);
  const total = Number(m.totalCount ?? 0);
  const start = getStartDate(m);
  const now = new Date();
  const oneHourMs = 60 * 60 * 1000;

  if (!isNaN(start.getTime()) && now >= start) return { key: "closed", label: "마감" };
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
}
/* ===================================================================== */

export default function LikeMatches() {
  const [items, setItems] = useState([]);
  const [inFlight, setInFlight] = useState(new Set());
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(true);

  // 목록 로드 (Principal 기반 → 이메일 불필요) & 과거 제거 → Applied와 동일한 UX
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/like-matches");
        const arr = Array.isArray(data) ? data : [];
        const upcoming = arr.filter(isUpcoming);
        const rows = upcoming
          .map((m) => ({ ...m, isLiked: m.isLiked ?? true }))
          .sort(
            (a, b) =>
              a.matchDate.localeCompare(b.matchDate) ||
              a.matchTime.localeCompare(b.matchTime)
          );
        setItems(rows);
      } catch (e) {
        const s = e?.response?.status;
        if (s === 401 || s === 403) setAuthError(true);
        else console.error("찜한 매치 조회 실패:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 날짜 그룹
  const grouped = useMemo(
    () => items.reduce((acc, m) => ((acc[m.matchDate] ??= []).push(m), acc), {}),
    [items]
  );

  // 하트 토글(낙관적 업데이트 · 카드 유지 · 실패 롤백)
  const toggleLike = async (matchNo) => {
    if (inFlight.has(matchNo)) return;
    const t = items.find((m) => m.matchNo === matchNo);
    if (!t) return;
    const prev = !!t.isLiked;

    setItems((list) =>
      list.map((m) => (m.matchNo === matchNo ? { ...m, isLiked: !m.isLiked } : m))
    );
    setInFlight((s) => new Set(s).add(matchNo));

    try {
      if (prev) await api.delete(`/like-matches/${matchNo}`);
      else await api.post(`/like-matches/${matchNo}`);
    } catch (e) {
      const s = e?.response?.status;
      if (s === 401 || s === 403) setAuthError(true);
      else alert("좋아요 처리에 실패했습니다. 다시 시도해주세요.");
      setItems((list) =>
        list.map((m) => (m.matchNo === matchNo ? { ...m, isLiked: prev } : m))
      );
    } finally {
      setInFlight((s) => {
        const n = new Set(s);
        n.delete(matchNo);
        return n;
      });
    }
  };

  // 상태별 화면 (Applied와 동일한 패턴)
  if (loading)
    return (
      <div className="like-container">
        <div className="like-title">찜한 매치</div>
        <div className="no-match">불러오는 중…</div>
      </div>
    );
  if (authError)
    return (
      <div className="like-container">
        <div className="like-title">찜한 매치</div>
        <div className="no-match">로그인 후 이용 가능합니다.</div>
      </div>
    );
  if (Object.keys(grouped).length === 0)
    return (
      <div className="like-container">
        <div className="like-title">찜한 매치</div>
        <div className="no-match">표시할 예정 매치가 없습니다.</div>
      </div>
    );

  /* =========================
     ⬇️ Applied 트리를 그대로 계승 (클래스만 like- 접두사) ⬇️
     ========================= */
  return (
    <div className="like-container">
      <div className="like-title">찜한 매치</div>

      {Object.entries(grouped).map(([date, list]) => (
        <div key={date} className="like-date-group">
          <div className="like-date">{date}</div>
          <ul className="like-list">
            {list.map((m) => {
              const status = getMatchStatus(m);
              return (
                <li key={m.matchNo} className="like-card">
                  <div className="like-left">
                    <div className="like-time">
                      <span className="time">{toHHmm(m.matchTime)}</span>
                      <span className={`status ${status.key}`}>{status.label}</span>
                    </div>
                    <div className="like-info">
                      <div className="stadium">{m.stadium}</div>
                      <div className="meta">
                        {m.genderNm} · {m.matchTypeNm} · 레벨 {m.minLevel}~{m.maxLevel}
                      </div>
                    </div>
                  </div>

                  <div className="like-right">
                    <div className="like-recruit">
                      모집현황: {m.currentCount ?? 0} / {m.totalCount ?? "미정"}
                    </div>
                    <button
                      className="like-action-btn"
                      onClick={() => toggleLike(m.matchNo)}
                      disabled={inFlight.has(m.matchNo)}
                      aria-pressed={m.isLiked}
                      title={m.isLiked ? "찜 취소" : "찜하기"}
                      style={{ cursor: inFlight.has(m.matchNo) ? "wait" : "pointer" }}
                    >
                      {m.isLiked ? (
                        <FaHeart size={22} color="#ff2d55" />
                      ) : (
                        <FaRegHeart size={22} color="#9ca3af" />
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
