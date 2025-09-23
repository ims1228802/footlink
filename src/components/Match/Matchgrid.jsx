import "./Matchgrid.css";


export default function MatchGrid(props) { // 매치 리스트 카드 컴포넌트
    return(
      <div class="match-card">
        <img src={props.image} style={{width: '328px'}}/>
        <div class="match-information">
          <div class="card-top">
            <h3>{props.time}</h3>
            <p class="match-state">{props.state}</p>
          </div>
          <p style={{fontWeight:'bold'}}>{props.title}</p>
          <div class="match-method-arr">
            <p class="match-gen">{props.gen}</p>
            <p class="match-method">{props.method}</p>
          </div>
          <p>모집 레벨 : {props.level}</p>
          <p>모집 현황 : {props.situation}</p>
        </div>
      </div>
    );
}