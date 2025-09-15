import { useState } from "react";
import apiFetch from "../util/apiFetch";
import useApi from "./useApi.jsx";   

export default function usePhoneVerification() {
  const { request, loading, error } = useApi();

  const requestVerification = (phone) =>
    request(async () => {
      // 중복 체크
      const data = await apiFetch(
        `/api/check-phone?phone=${phone}`
      );
      if (data.exists) {
        alert("이미 등록된 휴대폰 번호입니다.");
        return { exists: true };
      }

      // 인증번호 요청
      await apiFetch(`/api/phone/request`, {
        method: "POST",
        body: JSON.stringify({ phone }),
      });

      alert("인증번호를 전송했습니다.");
      return { exists: false };
    });

  return { requestVerification, loading, error };
}
