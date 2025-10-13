import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notice from "../../data/notice";
import styles from "../../css/user/Notice.module.css";

export default function Notice() {
  const navigate = useNavigate();

  // 탭(공지/이벤트/전체)
  const [activeTab, setActiveTab] = useState("전체");
  // 정렬 (최신순 / 오래된순)
  const [sortOrder, setSortOrder] = useState("최신순");

  // ✅ 탭 필터링
  const filteredNotices =
    activeTab === "전체"
      ? notice
      : notice.filter((n) =>
          activeTab === "공지" ? n.type.includes("[공지]") : n.type.includes("[이벤트]")
        );

  // ✅ 정렬
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "최신순" ? dateB - dateA : dateA - dateB;
  });

  // ✅ 상세 이동
  const handleClick = (id) => {
    navigate(`/user/notice/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>공지사항</h1>

      {/* 🔹 필터 & 정렬 영역 */}
      <div className={styles.topBar}>
        <div className={styles.tabContainer}>
          {["전체", "공지", "이벤트"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.sortBox}>
          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
          </select>
        </div>
      </div>

      {/* 🔹 공지 리스트 */}
      <div className={styles.noticeList}>
        {sortedNotices.length > 0 ? (
          sortedNotices.map((n) => (
            <div
              key={n.id}
              className={styles.noticeCard}
              onClick={() => handleClick(n.id)}
            >
              <div className={styles.noticeLeft}>
                <div className={styles.noticeTitle}>
                  <span className={styles.noticeType}>{n.type}</span> {n.title}
                </div>
                <div className={styles.noticeDate}>{n.date}</div>
              </div>
              <div className={styles.noticeRight}>▶</div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>해당 카테고리에 공지사항이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
