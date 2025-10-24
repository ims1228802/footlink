import Layout from "../../layout/Layout.jsx";
import Level from "../../components/team/level.jsx";
import "../../css/team/NewTeamNext.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { step2_team_state, cleanForm, teamEditPut } from "../../store/teamSlice.js";
import { option } from "../../data/team/chart.js";
import { Radar } from "react-chartjs-2";
import { 
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
    } from "chart.js";

export default function EditTeamNext() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state.teamCreate.state);
    const teamStateSelector = useSelector(state => state.teamCreate.step2_team_state);
    const [ teamState, setTeamState ] = useState(teamStateSelector);
    const selectedState = location.state.chartData;
    const teamInfo = location.state.data;

    //console.log(teamState);
    console.log(selectedState);

    useEffect(() => {
        console.log(state);
        if(state == 'succeeded'){
            dispatch(cleanForm());
            navigateHandler('next');
        }else if(state == "failed"){
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');
        }else{
            console.log('로딩중...');
        }
    },[dispatch, state]);

    useEffect(() => {
        const update = {
            ...teamState,
            level: teamInfo.level,
            attack: selectedState.datasets[0].data[0],
            speed: selectedState.datasets[0].data[1],
            dribble: selectedState.datasets[0].data[2],
            stamina: selectedState.datasets[0].data[3],
            defense: selectedState.datasets[0].data[4],
            physical: selectedState.datasets[0].data[5],
            pass: selectedState.datasets[0].data[6],
            shot: selectedState.datasets[0].data[7],
        }

        setTeamState(update);
    },[]);

    ChartJS.register(
            RadialLinearScale,
            PointElement,
            LineElement,
            Filler,
            Tooltip,
            Legend
        );

    const chartData = {
            labels: ['공격','스피드','드리블','체력','방어','피지컬','패스','슛'],
            datasets: [
                {
                    label: '',
                    data: [
                            teamState.attack,
                            teamState.speed, 
                            teamState.dribble, 
                            teamState.stamina,
                            teamState.defense, 
                            teamState.physical, 
                            teamState.pass, 
                            teamState.shot, 
                        ],
                    fill: true,     //선 안쪽 색상 채워짐
                    backgroundColor: 'rgba(0,173,181,0.6)',   // 선 안쪽 색상
                    pointRadius: 0,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#545455'
                }
            ],
        }

    const navigateHandler = (route) => {
        console.log(route);

        if (route == 'pre'){
            navigate('/editTeam', {
                state: {
                    data: location.state.data,
                    chartData: location.state.chartData,
                }
            });
        }else{
            navigate(`/teamDetail?teamCode=${teamInfo.teamCode}`);
        }
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        const update = {
            ...teamState,
            [name]: value
        }

        setTeamState(update);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(teamState);
        dispatch(step2_team_state(teamState));
        dispatch(teamEditPut());
    }

    return(
         <Layout>
            <form onSubmit={submitHandler}>
                <div className="level-text">
                    <h2>팀 레벨을 선택해주세요</h2>
                    <p>팀의 평균 실력을 알려주세요</p>
                </div>
                <Level 
                    teamState={teamState}
                    setTeamState={setTeamState}
                />
                <div className="team-stats">
                    <h2>팀 능력치를 설정해주세요</h2>
                    <div className="chart-div">
                        <Radar data={chartData} options={option}/>
                    </div>
                    <div className="stats-div">
                        <div className="slider-container">
                            <p>공격</p>
                            <input type="range" min="0" max="10" name="attack" value={teamState.attack} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>스피드</p>
                            <input type="range" min="0" max="10" name="speed" value={teamState.speed} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>드리블</p>
                            <input type="range" min="0" max="10" name="dribble" value={teamState.dribble} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>체력</p>
                            <input type="range" min="0" max="10" name="stamina" value={teamState.stamina} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>수비</p>
                            <input type="range" min="0" max="10" name="defense" value={teamState.defense} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>피지컬</p>
                            <input type="range" min="0" max="10" name="physical" value={teamState.physical} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>패스</p>
                            <input type="range" min="0" max="10" name="pass" value={teamState.pass} onChange={onChangeHandler}/>
                        </div>
                        <div className="slider-container">
                            <p>슛</p>
                            <input type="range" min="0" max="10" name="shot" value={teamState.shot} onChange={onChangeHandler}/>
                        </div>
                    </div>
                </div>
                <div className="button-div">
                    <button type="button" className="outline-btn" onClick={() => navigateHandler('pre')}>이전으로</button>
                    <button type="submit" className="fill-btn">수정하기</button>
                </div>
            </form>
        </Layout>
    );
}