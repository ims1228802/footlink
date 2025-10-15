import { useNavigate } from "react-router-dom";
import "../../css/user/MyTeam.css";
import teamDefault from "../../assets/team/team_logo.png";
import Location from "../../assets/icon/Location.svg";
import User from "../../assets/icon/User.svg";
import { useUser } from "../../hooks/useUser";
import { useMyTeam } from "../../hooks/useMyTeam";

export default function MyTeam() {
  const { data: user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  //  로그인된 유저 이메일로 팀 리스트 조회
  const {
    data: myTeam = [],
    isLoading: teamLoading,
    error,
  } = useMyTeam(user?.email);

  // 목업 이미지 데이터 (팀 프로필 컬럼 미구현 상태)
  const mockImages = [
    teamDefault,
    teamDefault,
    teamDefault,
  ];

  // 백엔드 응답에 목업 이미지 병합
  const teamsWithMockImg = myTeam.map((team, idx) => ({
    ...team,
    teamImg: mockImages[idx % mockImages.length] || teamDefault,
  }));

  if (userLoading || teamLoading)
    return <div className="myinfo-loading">로딩 중...</div>;
  if (!user)
    return <div className="myinfo-require-login">로그인이 필요합니다.</div>;
  if (error)
    return <div className="myteam-error">데이터를 불러오는 중 오류 발생</div>;
  if (!myTeam.length)
    return (
      <div className="myteam-empty">
        <p>가입된 팀이 없습니다.</p>
        <button
          onClick={() => navigate("/newTeam")}
          className="myteam-create-btn"
        >
          팀 생성하기
        </button>
      </div>
    );

  return (
    <div className="myteam-container">
      <h3 className="myteam-title">팀 조회</h3>
      <div className="myteam-separator">
        <h4 className="myteam-subtitle">소속 팀</h4>

        <ul className="myteam-list">
          {myTeam.map((team) => (
            <li
              key={team.teamCd}
              className="myteam-item"
              onClick={() => navigate(`/teamDetail?teamCd=${team.teamCd}`)}
            >
              {/* 팀 이미지 */}
              <div className="myteam-img-wrap">
                <img
                  src={team.teamImg || teamDefault}
                  alt={team.teamNm}
                  className="myteam-img"
                />
              </div>

              {/* 팀 정보 */}
              <div className="myteam-info">
                <div className="myteam-header">
                  <h3 className="myteam-name">{team.teamNm}</h3>

                  <div className="myteam-count-group">
                    <img
                      src={User}
                      alt="팀원수"
                      className="myteam-count-icon"
                    />
                    <div className="myteam-count">{team.memberCount}</div>
                  </div>
                </div>
                <div className="myteam-location-group">
                  <img
                    src={Location}
                    alt="지역"
                    className="myteam-location-icon"
                  />
                  <div className="myteam-location">{team.rgnNm}</div>
                </div>
                <div className="myteam-tags">
                  <div>{team.gender}</div>
                  <div>|</div>
                  <div>{team.ageGroup}</div>
                  <div>|</div>
                  <div>{team.actDow}</div>
                  <div>|</div>
                  <div>{team.level}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 플로팅 버튼 */}
      <button
        className="myteam-floating-btn"
        onClick={() => navigate("/newTeam")}
      >
        <span className="plus">＋</span> 팀 생성
      </button>
    </div>
  );
}
