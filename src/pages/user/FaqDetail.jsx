import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import faqData from "../../data/faq";
import styles from "../../css/user/FaqDetail.module.css";

export default function FaqDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const faq = faqData.find((f) => f.id === parseInt(id));

  if (!faq) return <p className={styles.error}>FAQ를 찾을 수 없습니다.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>FAQ</h1>

      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ◀
      </button>

      <div className={styles.content}>
        <p className={styles.category}>{faq.category}</p>
        <h2 className={styles.question}>Q. {faq.question}</h2>
        <p className={styles.answer}>{faq.answer}</p>
      </div>
    </div>
  );
}
