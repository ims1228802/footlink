import { Link } from "react-router-dom";


export default function EndList(props) {
    return(
            <div class="end-list">
                <div class="end-item">
                    <Link to="/result">
                        <h2>{props.matchTime}</h2>
                        <div class="end-detail">
                            <p>{props.filed}</p><p>{props.gen}</p>-<p>{props.level}</p>
                        </div>
                        <div class= "end-team-arr">
                            <img src={props.img} alt="" /><p>{props.team1}</p>
                        </div>
                        <div class= "end-team-arr">
                            <img src={props.img} alt="" /><p>{props.team2}</p>
                        </div>
                    </Link>
                </div>
            </div>
    );
}