// src/hooks/usePhoneVerification.js
import { useState } from "react";

export default function usePhoneVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestVerification = async (phone) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost/api/check-phone?phone=${phone}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("서버 응답 실패");
      }

      if (data.exists) {
        alert("이미 등록된 휴대폰 번호입니다.");
        return { exists: true };
      } else {
        alert("인증번호를 전송했습니다.");
        // 여기서 SMS API 호출 로직 추가 가능
        return { exists: false };
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { requestVerification, loading, error };
}