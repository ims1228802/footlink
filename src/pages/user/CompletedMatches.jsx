import React, { useEffect, useState } from "react";

const CompletedMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [query, setQuery] = useState({
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    region: "",
    field: "",
  });

  // 🧭 데이터 로드 (예시 API)
  useEffect(() => {
    // 실제 API 주소로 교체
    fetch("https://api.example.com/matches/completed")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setFilteredMatches(data);
      })
      .catch((err) => console.error("데이터 불러오기 실패:", err));
  }, []);

  // 🔍 검색 기능
  const handleSearch = () => {
    const { startDate, endDate, region, field } = query;

    const filtered = matches.filter((m) => {
      const date = new Date(m.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        date >= start &&
        date <= end &&
        (region === "" || m.region.includes(region)) &&
        (field === "" || m.field.includes(field))
      );
    });

    setFilteredMatches(filtered);
  };

  // 🧩 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="completed-container">
      <h1>완료된 매치</h1>

      <div className="filter-box">
        <div className="filter-row">
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

          <button className="search-btn" onClick={handleSearch}>
            검색
          </button>
        </div>

        <input
          type="text"
          name="field"
          className="field-input"
          placeholder="구장명을 입력하세요."
          value={query.field}
          onChange={handleChange}
        />
      </div>

      <div className="match-list">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div className="match-card" key={match.id}>
              <div className="match-date">
                {match.date} {match.time}
              </div>
              <div className="match-field">
                {match.region} {match.field}
              </div>
              <div className="match-detail">
                {match.teamA} vs {match.teamB}
              </div>
            </div>
          ))
        ) : (
          <p className="no-result">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedMatches;
