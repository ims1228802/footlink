import React, { useEffect, useState } from "react";
import completeMatches from "../../data/completeMatches";
import styles from "../../css/user/CompletedMatches.module.css"; // ✅ CSS Module 사용

export default function CompletedMatches() {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [query, setQuery] = useState({
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    region: "",
    field: "",
  });

  // 🧭 데이터 로드
  useEffect(() => {
    setMatches(completeMatches);
    setFilteredMatches(completeMatches);
  }, []);

  // 🔍 검색
  const handleSearch = () => {
    const { startDate, endDate, region, field } = query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = matches.filter((m) => {
      const date = new Date(m.date);
      return (
        date >= start &&
        date <= end &&
        (region === "" || m.stadium.includes(region)) &&
        (field === "" || m.stadium.includes(field))
      );
    });

    setFilteredMatches(filtered);
  };

  // 입력 핸들러
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
            <div className={styles.matchCard} key={match.matchNum}>
              <div className={styles.matchHeader}>
                <span className={styles.matchDate}>
                  {match.date} {match.start}
                </span>
                <span className={styles.matchField}>{match.stadium}</span>
              </div>

              <div className={styles.matchTeam}>{match.team}</div>
            </div>
          ))
        ) : (
          <p className={styles.noResult}>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
