import { useState } from "react";
import Headers from '../../components/Header/Header';
import teamimg from "../../../public/Teamicon.svg";
// import { MATCH_SCORE } from "../matchscore.js";
import MatchScore from "../../components/Match/Matchscore.jsx";
// import { teamData } from "../../data/match/";
import ResultTable from "../../components/Match/Resulttable.jsx"

function ResultPage() {
    const [activeContentIndex, setActiveContentIndex] = useState(0);
  
  const activeGame = teamData.games[activeContentIndex];
  const matchList = MATCH_SCORE.map(matchInfo => {
    return (
      <MatchScore {...matchInfo}/>  
    )
  })

  const teamsToDisplay = activeGame.teams.map((userInfo, teamIndex) => {
    return (
      <ResultTable key={teamIndex} {...userInfo} />
    );
  });
    return(
        <>
      <Headers />
      <div class="match-result-arr">
        <div class="match-result-box">
            <h1 style={{ margin: '5px' }}>매치결과</h1>
            <p style={{ margin: '5px' }}>7월28일 (월) 17:00 두잇 풋살장 A구장</p>
            <div class="team-match-result">
            {matchList}
          </div>
        </div>
        <div id="tabs">
          <menu>
            {teamData.games.map((game, index) => (
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
            <div class="match-record">
              <div class="match-score-arr" style={{display:'flex', fontSize:'20px'}}>
                <p style={{marginRight:'15px'}}>패트 풋살</p>
                  <img src={teamimg} style={{width:'80px', margin:'15px'}}/>
                    <div class="score-arr" style={{display: 'flex'}}>
                      <p class="homescore" style={{marginLeft: '14px', marginRight: '14px'}}>4</p>
                        <p>:</p>
                      <p class="awayscore" style={{marginLeft: '14px', marginRight: '14px'}}>2</p>
                    </div>
                  <img src={teamimg} style={{width:'80px', margin:'15px'}}/>
                <p style={{marginLeft:'15px'}}>임시팀</p>
              </div>
              <div class="user-record-arr" style={{border : '1px solid'}}>
                {teamsToDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
}

export default ResultPage;