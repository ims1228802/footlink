import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useUser() {
  return useQuery({
    queryKey: ["user"], // 캐시 식별 키
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return null; // 비로그인 시 null 반환
      const res = await axiosInstance.get("/user/my-info");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: false,
  });
}
