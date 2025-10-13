import Layout from "../../layout/Layout";
import Level from "../../components/team/level";
import "../../css/team/NewTeamNext.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { step2_team_state, cleanForm, teamCreatePost } from "../../store/teamSlice";

export default function NewTeamNext() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state.teamCreate.state);
    const teamStateSelector = useSelector(state => state.teamCreate.step2_team_state);
    const [ teamState, setTeamState ] = useState(teamStateSelector);

    useEffect(() => {
        if(state == 'succeeded'){
            dispatch(cleanForm());
            navigateHandler('next');
        }else if(state == "failed"){
            alert('알 수 없는 오류로 인해 등록에 실패했습니다.');
        }else{
            console.log('로딩중...');
        }
    },[dispatch, state]);

    const navigateHandler = (route) => {
        console.log(route);

        if (route == 'pre'){
            navigate('/newTeam');
        }else{
            navigate('/teamList');
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
        dispatch(teamCreatePost());
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
                        chart-view
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
                    <button type="submit" className="fill-btn">생성하기</button>
                </div>
            </form>
        </Layout>
    );
}