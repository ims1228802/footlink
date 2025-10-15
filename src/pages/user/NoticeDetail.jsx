import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import notice from "../../data/notice";
import styles from "../../css/user/NoticeDetail.module.css";

export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const notice = notice.find((n) => n.id === Number(id));

  if (!notice) {
    return <p className={styles.noData}>해당 공지사항을 찾을 수 없습니다.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>공지사항</h1>

      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ←
      </button>

      <div className={styles.noticeHeader}>
        <div className={styles.noticeType}>{notice.type}</div>
        <div className={styles.noticeTitle}>{notice.title}</div>
        <div className={styles.noticeDate}>{notice.date}</div>
      </div>

      <div className={styles.noticeContent}>
        {notice.content.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
}
