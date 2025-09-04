import { user, matchStats } from "../../data/user";
import Game from "../../assets/icon/Game.svg?react";
import Starrate from "../../assets/icon/Starrate.svg?react";
import History from "../../assets/icon/History.svg?react";
import Share from "../../assets/icon/Share.svg?react";

export default function MyPage() {
  return (
    <div>
      <h3>내 정보</h3>
      <button>
        <Share />
      </button>
      <div>
        <div>소셜매치</div>
        <ul>
          <li>
            <Game />
            <p>경기</p>
            <p>{matchStats.totalGames}</p>
          </li>
          <li>
            <Starrate />
            <p>MVP</p>
            <p>{matchStats.mvpCount}</p>
          </li>
          <li>
            <History />
            <p>최근활동</p>
            <p>{matchStats.lastActivity}</p>
          </li>
        </ul>
      </div>
      <div>
        <div>기본정보</div>
        <div>
          <p>레벨</p>
          <p>{user.level}</p>
        </div>
        <div>
          <p>포지션</p>
          <p>{user.position}</p>
          
        </div>
        <div>
          <p>지역</p>
          <p>{user.location}</p>
        </div>
        <div>
          <p>소속팀</p>
          <p>{user.teams}</p>
        </div>
      </div>
      <div>
        <div>자기소개</div>
        <div>{user.introduction}</div>
      </div>
    </div>
  );
}
