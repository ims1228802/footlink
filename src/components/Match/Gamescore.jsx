import teamimg from "../../../public/Teamicon.svg"

export default function Gamescore(name, score) {
    return(
        <div class="match-score-arr" style={{display:'flex', fontSize:'20px'}}>
            <p style={{marginRight:'15px'}}>{name}</p>
                <img src={teamimg} style={{width:'80px', margin:'15px'}}/>
                <div class="score-arr" style={{display: 'flex'}}>
                    <p class="homescore" style={{marginLeft: '14px', marginRight: '14px'}}>{score}</p>
                    <p>:</p>
                    <p class="awayscore" style={{marginLeft: '14px', marginRight: '14px'}}>{score}</p>
                </div>
                <img src={teamimg} style={{width:'80px', margin:'15px'}}/>
            <p style={{marginLeft:'15px'}}>{name}</p>
        </div>
    )
}