import './Matchscore.css'

export default function MatchScore(props) { // 매치 리스트 카드 컴포넌트
    return (
        <div class="hometeam-arr">
            <div class="team-name">
                <p>{props.team}</p>
            </div>
            <div class="team-img">
                <img src={props.img} />
            </div>
            <div class="score-board">
                <div class="team-result">
                    <p>승</p>
                    <p>무</p>
                    <p>패</p>
                    <p>득실</p>
                    <p>승점</p>
                </div>
                <div class="result-score">
                    <p>{props.wins}</p>
                    <p>{props.draws}</p>
                    <p>{props.loses}</p>
                    <p>{props.goal_df}</p>
                    <p>{props.points}</p>
                </div>
            </div>
        </div>
    );
}