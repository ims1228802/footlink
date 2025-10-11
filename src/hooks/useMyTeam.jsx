import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

/**
 * [useMyTeam]
 * 로그인된 사용자의 이메일 기반으로 소속 팀 리스트를 조회하는 훅
 * @param {string} email - 로그인된 사용자 이메일
 */
export function useMyTeam(email) {
  return useQuery({
    queryKey: ["myTeam", email], // 캐시 키
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosInstance.get(`/user/my-team/${email}`);
      return res.data;
    },
    enabled: !!email,       // email 존재할 때만 실행
    staleTime: 1000 * 60,   // 1분 캐시 유지
    retry: false,           // 실패 시 자동 재시도 비활성화
  });
}