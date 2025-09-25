import { useState } from "react";
import useApi from "./useApi";
import apiFetch from "../util/apiFetch";

export default function useVerifyCode() {
  const { request, loading, error } = useApi();

  const verifyCode = (phone, code) =>
    request(async () => {
      await apiFetch(`http://localhost/api/phone/verify`, {
        method: "POST",
        body: JSON.stringify({ phone, code }),
      });
      alert("인증 성공!");
      return true;
    });

  return { verifyCode, loading, error };
}
