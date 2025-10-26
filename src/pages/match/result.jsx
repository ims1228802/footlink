import { useState, useEffect } from "react"; 
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 
import MatchScore from "../../components/Match/Matchscore.jsx";
import ResultTable from "../../components/Match/Resulttable.jsx";
import Layout from '../../layout/Layout';
import "./result.css";

function ResultPage() {
  const { matchNo } = useParams(); 
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [matchInfo, setMatchInfo] = useState(null); 
  const [gameDetails, setGameDetails] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
       
        const summaryResponse = await axios.get(`http://localhost/api/Match/${matchNo}/summary`);
        setMatchInfo(summaryResponse.data);
        console.log("매치 요약 데이터:", summaryResponse.data);

        const detailsResponse = await axios.get(`http://localhost/api/Match/${matchNo}/details`);
        setGameDetails(detailsResponse.data.games || []); 
        console.log("매치 상세 데이터:", detailsResponse.data);

        if (detailsResponse.data.games && detailsResponse.data.games.length > 0) {
            setActiveContentIndex(0);
        }

      } catch (err) {
        console.error("매치 결과 데이터 로딩 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setGameDetails([]); 
        setMatchInfo(null);
      } finally {
        setLoading(false);
      }
    };

    if (matchNo) {
      fetchData();
    }
  }, [matchNo]); 


  if (loading) {
    return <Layout><p>매치 결과를 불러오는 중...</p></Layout>;
  }
  if (error) {
    return <Layout><p style={{ color: 'red' }}>{error}</p></Layout>;
  }

  if (!matchInfo || gameDetails.length === 0) {
      return <Layout><p>표시할 매치 결과 데이터가 없습니다.</p></Layout>;
  }


  const activeGame = gameDetails[activeContentIndex];

  if (!activeGame) {

      return <Layout><p>선택된 경기 정보가 없습니다.</p></Layout>;
  }
  const teamA = activeGame.teams[0];
  const teamB = activeGame.teams[1];

  const matchList = matchInfo.teamSummaries ? matchInfo.teamSummaries.map((summary, index) => {
    return (
      <MatchScore
          key    = {index}
          team   = {summary.teamName}
          img    = {teamimg} 
          wins   = {summary.wins}
          draws  = {summary.draws}
          loses  = {summary.losses} 
          goal_df= {summary.goalDifference} 
          points = {summary.points || (summary.wins * 3 + summary.draws)} 
      />
    );
  }) : null; 

  const teamsToDisplay = activeGame.teams.map((teamInfo, teamIndex) => {
    return (
      <ResultTable key={teamIndex} {...teamInfo} />
    );
  });

  return (
    <>
      <Layout>
        <div className="match-result-arr">
          <div className="match-result-box">
            <h1 style={{ margin: '5px' }}>매치결과</h1>
            {/* matchInfo에서 가져온 데이터 사용 */}
            <p style={{ margin: '5px' }}>
              {matchInfo.matchDate} ({/* 요일 정보 필요시 추가 가공 */} ) {matchInfo.matchTime} {matchInfo.stadiumName} {/* 구장 정보 추가 */}
            </p>
            <div className="team-match-result">
              {matchList}
            </div>
          </div>

          <div id="tabs">
            <menu>
              {/* gameDetails (state) 사용 */}
              {gameDetails.map((game, index) => (
                <button
                  key={game.gameNumber}
                  className={activeContentIndex === index ? "active" : ""}
                  onClick={() => setActiveContentIndex(index)}
                >
                  {game.gameNumber}경기
                </button>
              ))}
            </menu>

            <div id="tab-content">
              <h1 style={{fontSize: '25px', color: 'silver'}}>경기 기록</h1>
              <div className="match-record">
                <div className="match-score-arr" style={{display:'flex', fontSize:'20px', alignItems: 'center'}}>
                  <p style={{marginRight:'15px'}}>{teamA.name}</p>
                  <img src={teamimg} alt={`${teamA.name} 로고`} style={{width:'80px', margin:'15px'}}/>
                  <div className="score-arr" style={{display: 'flex', alignItems: 'center'}}>
                    <p className="homescore" style={{marginLeft: '14px', marginRight: '14px'}}>{teamA.score}</p>
                    <p>:</p>
                    <p className="awayscore" style={{marginLeft: '14px', marginRight: '14px'}}>{teamB.score}</p>
                  </div>
                  <img src={teamimg} alt={`${teamB.name} 로고`} style={{width:'80px', margin:'15px'}}/>
                  <p style={{marginLeft:'15px'}}>{teamB.name}</p>
                </div>
                <div className="user-record-arr" style={{border : '1px solid'}}>
                  {teamsToDisplay}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ResultPage;