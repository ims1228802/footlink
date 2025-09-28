import { user } from "../../data/user";

export default function MyTeam() {
  return (
    <div>
      <h3>팀 조회</h3>
      <button>
        <img src={Share} alt="공유"></img>
      </button>
      <div>
        <div>소셜매치</div>
        <ui>
          <li>
            <p>{Game} 경기</p>
            <p>{user.matchStats.totalGames}</p>
          </li>
        </ui>
        <li>
          <p>{Starrate} MVP</p>
          <p>{user.matchStats.mvpCount}</p>
        </li>
        <li>
          <p>{History} 최근활동</p>
          <p>{user.matchStats.lastActivity}</p>
        </li>
      </div>
      <div>
        <div>기본정보</div>
        <div>
          <p>레벨</p>
          {user.level}
        </div>
        <div>
          <p>포지션</p>
          {user.position}
        </div>
        <div>
          <p>지역</p>
          {user.location}
        </div>
        <div>
          <p>소속팀</p>
          {user.teams}
        </div>
      </div>
      <div>
        <div>자기소개</div>
        <div>{user.introduction}</div>
      </div>
    </div>
  );
}
