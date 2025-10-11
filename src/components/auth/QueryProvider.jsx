import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 탭 전환 시 자동 새로고침 방지
      retry: 0, // 실패 시 재시도 비활성화
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    },
  },
});

export default function QueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
