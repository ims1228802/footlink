import { Link } from "react-router-dom";


export default function EndList(props) {
    return(
            <div class="end-list">
                <div class="end-item">
                    <Link to="/result">
                        <h2>{props.matchTime}</h2>
                        <div class="end-detail">
                            <p>{props.stadiumNm}</p><p>{props.genderNm}</p>-<p>{props.minLevelName}~{props.maxLevelName}</p>
                        </div>
                        <div class= "end-team-arr">
                            <div class= "winner-team-arr"> 
                                <img src={props.img} alt="" /><p>{props.winnerTeamName}</p>
                            </div>
                            <div class="winner-score">
                                <p>{props.winnerScore}</p>
                            </div>
                        </div>
                        <div class= "end-team-arr">
                            <div class= "loser-team-arr">
                                <img src={props.img} alt="" /><p>{props.loserTeamName}</p>
                            </div>
                            <div class="loser-score">
                                <p>{props.loserScore}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
    );
}