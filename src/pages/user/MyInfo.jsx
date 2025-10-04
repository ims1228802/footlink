import Game from "../../assets/icon/Game.svg";
import StarRate from "../../assets/icon/StarRate.svg";
import History from "../../assets/icon/History.svg";
import Share from "../../assets/icon/Share.svg";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../hooks/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../../store/userSlice";

export default function MyInfo() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  console.log("📍 MyInfo 컴포넌트 렌더링됨");

    const matchStats = user?.matchStats || {
    totalGames: 0,
    mvpCount: 0,
    lastActivity: "-",
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      dispatch(setLoading(true));
      try {
        const res = await axiosInstance.get("/user/my-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
      } catch (err) {
        console.error("내 정보 불러오기 실패:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다.</div>;

  return (
    <div>
      <h3>내 정보</h3>
      <button>
        <img src={Share} alt="내 정보" />
      </button>
      <div>
        <div>소셜매치</div>
        <ul>
          <li>
            <img src={Game} alt="경기" />
            <p>경기</p>
            <p>{matchStats.totalGames}</p>
          </li>
          <li>
            <img src={StarRate} alt="MVP" />
            <p>MVP</p>
            <p>{matchStats.mvpCount}</p>
          </li>
          <li>
            <img src={History} alt="최근활동" />
            <p>최근활동</p>
            <p>{matchStats.lastActivity}</p>
          </li>
        </ul>
      </div>
      <div>
        {/* 🔹 기본정보 */}
        <div>
          <div>기본정보</div>
          <div>
            <p>이름</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p>레벨</p>
            <p>{user.level}</p>
          </div>
          <div>
            <p>포지션</p>
            <p>{user.pst}</p>
          </div>
          <div>
            <p>지역</p>
            <p>{user.addr}</p>
          </div>
          <div>
            <p>이메일</p>
            <p>{user.email}</p>
          </div>
        </div>

        {/* 🔹 자기소개 */}
        <div>
          <div>자기소개</div>
          <div>{user.intro || "자기소개가 없습니다."}</div>
        </div>
      </div>
    </div>
  );
}
