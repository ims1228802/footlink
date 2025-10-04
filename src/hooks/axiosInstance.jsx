import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:80/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터: 매 요청마다 토큰 자동 첨부
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: 토큰 만료 시 자동 로그아웃
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
