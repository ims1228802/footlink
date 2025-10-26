import React, { useEffect, useState } from "react";
import styles from "../../css/user/CompletedMatches.module.css";
import api from "../../hooks/axiosInstance";

export default function CompletedMatches() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [query, setQuery] = useState({
    startDate: "",
    endDate: "",
    region: "",
    field: "",
  });

  // ✅ 완료 경기 불러오기 (API)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/myinfo/completed-matches");
        setMatches(data); // 전체 데이터
        setFilteredMatches(data); // 초기 상태 = 전체
      } catch (err) {
        console.error("완료 경기 불러오기 실패:", err);
      }
    })();
  }, []);

  // ✅ 🔍 검색 필터
  const handleSearch = () => {
    const { startDate, endDate, region, field } = query;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const filtered = matches.filter((m) => {
      const matchDate = new Date(m.matchDate); // ✅ 백엔드 JSON 필드 기준
      return (
        (!start || matchDate >= start) &&
        (!end || matchDate <= end) &&
        (region === "" || m.stadium?.includes(region)) &&
        (field === "" || m.stadium?.includes(field))
      );
    });

    setFilteredMatches(filtered);
  };

  // ✅ 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>완료된 매치</h1>

      {/* 🔍 검색 필터 */}
      <div className={styles.filterBox}>
        <div className={styles.filterRow}>
          <label>기간</label>
          <input
            type="date"
            name="startDate"
            value={query.startDate}
            onChange={handleChange}
          />
          <span>~</span>
          <input
            type="date"
            name="endDate"
            value={query.endDate}
            onChange={handleChange}
          />

          <label>지역</label>
          <input
            type="text"
            name="region"
            placeholder="예: 전주"
            value={query.region}
            onChange={handleChange}
          />

          <button className={styles.searchBtn} onClick={handleSearch}>
            검색
          </button>
        </div>

        <input
          type="text"
          name="field"
          className={styles.fieldInput}
          placeholder="구장명을 입력하세요."
          value={query.field}
          onChange={handleChange}
        />
      </div>

      {/* 📋 매치 리스트 */}
      <div className={styles.matchList}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div className={styles.matchCard} key={match.matchNo}>
              <div className={styles.matchHeader}>
                <span className={styles.matchDate}>
                  {match.matchDate} {match.matchTime}
                </span>
                <span className={styles.matchField}>{match.stadium}</span>
              </div>

              <div className={styles.matchTeam}>
                <p>결과: {match.homeScore} : {match.awayScore}</p>
                <p>승자: {match.winner || "무승부"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResult}>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
