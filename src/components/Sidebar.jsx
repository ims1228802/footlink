// 사이드바
import Vector from "../assets/layout/Vector.svg";
import KnightShield from "../assets/layout/KnightShield.svg";
import Handshake from "../assets/layout/Handshake.svg";
import Commercial from "../assets/layout/Commercial.svg";
import Help_outline from "../assets/layout/Help_outline.svg";
import Settings from "../assets/layout/Settings.svg";
import Output from "../assets/layout/Output.svg";
import { user } from "../data/user.js";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <div id="sidebar">
        <nav>
          <div className="sidebar-top">
            <img src={user.user.img} alt="Profile" />
            <h3>{user.user.name}</h3>
            <p>{user.user.email}</p>
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-block">
              <div className="sidebar-title"> MY 정보관리</div>
              <ul>
                <li>
                  <Link to="/myinfo">내 정보</Link>
                  <img src={Vector} alt="내 정보" />
                </li>
                <li>
                  <Link to="/myteams">소속한팀</Link>
                  <img src={KnightShield} alt="소속한팀" />
                </li>
                <li>
                  <Link to="/mymatch">매치정보</Link>
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
                  <Link to="/logout">로그아웃</Link>
                  <img src={Output} alt="로그아웃" />
                </li>
              </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
