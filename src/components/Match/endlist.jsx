import { Link } from "react-router-dom";


export default function EndList(props) {
    const date = new Date(props.matchDate);
    
    const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
        month: 'long',  
        day: 'numeric', 
        weekday: 'long' 
    });
    const formattedStartTime = props.matchTime.substring(0, 5); // "21:00:00" -> "21:00"
    const formattedEndTime = props.matchEndTime.substring(0, 5);
    const formattedDate = dateFormatter.format(date);
    return(
            <div class="end-list">
                <div class="end-item">
                    <Link to="/result">
                        <h2>{formattedDate}{formattedStartTime}-{formattedEndTime}</h2>
                        <div class="end-detail">
                            <p>{props.stadiumNm} </p>
                            <div class="end-detail-divider">
                                <p>{props.genderNm}</p>-<p>{props.minLevelName}~{props.maxLevelName}</p>
                            </div>
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