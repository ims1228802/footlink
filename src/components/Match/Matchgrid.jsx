import "./Matchgrid.css";


export default function MatchGrid(props) { 
    const startTime = props.matchTime.slice(0, 5);
    const endTime = props.matchEndTime.slice(0, 5);
    return (
        <div class="match-card">
            <img src={props.filePath} style={{ width: '328px' }} />
            <div class="match-information">
                <div class="card-top">
                    <h3>{startTime}~{endTime}</h3>
                    <p class="match-state">{props.matchStts}</p>
                </div>
                <p style={{ fontWeight: 'bold' }}>{props.staName}{props.fieldName}</p>
                <div class="match-method-arr">
                    <p class="match-gen">{props.genderName}</p>
                    <p class="match-method">{props.matchTypeName}</p>
                </div>
                <p>모집 레벨 : {props.minLevelName}~{props.maxLevelName}</p>
                <p>모집 현황 : 5/{props.totalPlayers}</p>
            </div>
        </div>
    );
}