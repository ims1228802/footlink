import React, { useState } from "react";
import faqData from "../../data/faq";
import styles from "../../css/user/Faq.module.css";

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [openId, setOpenId] = useState(null); // 🔹 열려 있는 질문 id 관리

  // ✅ 카테고리 목록 자동 생성
  const categories = ["전체", ...new Set(faqData.map((f) => f.category.replace(/\[|\]/g, "")))];

  // ✅ 필터 + 검색 기능
  const filteredFaqs = faqData.filter((f) => {
    const matchCategory =
      activeCategory === "전체" || f.category.includes(activeCategory);
    const matchSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ✅ 토글 열기/닫기
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>FAQ</h1>

      {/* 🔍 검색창 */}
      <div className={styles.searchBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="궁금한 사항을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🏷️ 카테고리 탭 */}
      <div className={styles.categoryTabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.tabBtn} ${
              activeCategory === cat ? styles.active : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📜 FAQ 목록 */}
      <div className={styles.list}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((f) => (
            <div key={f.id} className={styles.card}>
              <div
                className={styles.questionRow}
                onClick={() => handleToggle(f.id)}
              >
                <div className={styles.left}>
                  <span className={styles.category}>{f.category}</span>
                  <span className={styles.question}>Q. {f.question}</span>
                </div>
                <div className={styles.right}>
                  {openId === f.id ? "▲" : "▼"}
                </div>
              </div>

              {openId === f.id && (
                <div className={styles.answerBox}>
                  <p>{f.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noResult}>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
