import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute({ children }) {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>로딩 중...</div>;
  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
