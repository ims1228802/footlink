// 사이드바
import Vector from "../assets/layout/Vector.svg";
import KnightShield from "../assets/layout/KnightShield.svg";
import Handshake from "../assets/layout/Handshake.svg";
import Commercial from "../assets/layout/Commercial.svg";
import Help_outline from "../assets/layout/Help_outline.svg";
import Settings from "../assets/layout/Settings.svg";
import Output from "../assets/layout/Output.svg";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser()); // Redux 상태 초기화 + 토큰 제거
    navigate("/login"); // 로그인 화면으로 이동
  };

  return (
    <div>
      <div id="sidebar">
        <nav>
          <div className="sidebar-top">
            <img src={user?.img || "/default-profile.png"} alt="Profile" />
            <h3>{user?.name || "Guest"}</h3>
            <p>{user?.email || ""}</p>
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-block">
              <div className="sidebar-title"> MY 정보관리</div>
              <ul>
                <li>
                  <Link to="/user/my-info">내 정보</Link>
                  <img src={Vector} alt="내 정보" />
                </li>
                <li>
                  <Link to="/user/my-teams">소속한팀</Link>
                  <img src={KnightShield} alt="소속한팀" />
                </li>
                <li>
                  <Link to="/user/my-info">매치정보</Link>
                  <img src={Handshake} alt="매치정보" />
                </li>
              </ul>
            </div>
            <div className="sidebar-block">
              <div className="sidebar-title">고객센터</div>
              <ul>
                <li>
                  <Link to="/notice">공지사항</Link>
                  <img src={Commercial} alt="공지사항" />
                </li>
                <li>
                  <Link to="/faq">자주 묻는 질문</Link>
                  <img src={Help_outline} alt="자주 묻는 질문" />
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar-block">
            <div className="sidebar-title">기타</div>
            <ul>
              <li>
                <Link to="/Settings">설정</Link>
                <img src={Settings} alt="설정" />
              </li>
              <li>
                <button onClick={handleLogout}>
              로그아웃
            </button>
                <img src={Output} alt="로그아웃" />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
