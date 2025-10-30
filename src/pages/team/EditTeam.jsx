import Layout from "../../layout/Layout";
import teamIcon from "../../assets/team/team_icon_128.png";
import search from "../../assets/team/search.png";
import "../../css/team/NewTeam.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StadiumSearch from "../../components/team/StadiumSearch";
import { step1_team_info } from "../../store/teamSlice";
import Upload from "../../components/Upload";

export default function EditTeam(){
    const navigate = useNavigate();
    const teamSelector = useSelector(state => state.teamCreate.step1_team_info);
    const dispatch = useDispatch();
    const location = useLocation();
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ selectModal, setSelectModel ] = useState('');
    const [ team, setTeam ] = useState(teamSelector);
    const [ selectImgUrl, setSelectImgUrl ] = useState('');
    const [ selectFile, setSelectFile ] = useState(null);
    const teamInfo = location.state.data;
    const teamRegion = teamInfo.regionName.split(' ');
    const week = ['일','월','화','수','목','금','토'];
    const engWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const selectedWeek = teamInfo.activeDoWeek.split(',');
    const selectedWeekIdx = [];
    let selectGender = '';
    let selectTime = '';
    let selectAge = '';

    useEffect(() => {
        console.log(teamInfo);
        console.log(team);

        const update = {
            ...team,
            teamCode: teamInfo.teamCode,
            teamName: teamInfo.teamName,
            stadium: teamInfo.stadium,
            area: teamRegion[0],
            city: teamRegion[1],
            gender: selectGender,
            activeTime: selectTime,
            age: selectAge,
            week: selectedWeekIdx,
        }
    
        setTeam(update);
    },[]);

    week.forEach((item, idx) => {
        if(selectedWeek.includes(item)){
            selectedWeekIdx.push(idx);
        }
    });

    switch(teamInfo.gender){
        case '남자':
            selectGender = 'man';
        break;
        case '여자':
            selectGender = 'woman';
        break;
        default:
            selectGender = 'everyone';
        break;
    }

    switch(teamInfo.teamAge){
        case '10대':
            selectAge = 10;
        break;
        case '20대':
            selectAge = 20;
        break;
        case '30대':
            selectAge = 30;
        break;
        case '40대':
            selectAge = 40;
        break;
        case '50대':
            selectAge = 50;
        break;
        default:
            selectAge = 60;
        break;
    }

    switch(teamInfo.meetingTime){
        case '아침':
            selectTime = 'morning';
        break;
        case '점심':
            selectTime = 'lunch';
        break;
        case '저녁':
            selectTime = 'dinner';
        break;
        default:
            selectTime = 'lateNight';
        break;
    }

    console.log(teamSelector);

    const openModel = (select) => {
        setSelectModel(select);
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        setModalOpen(true);
    }

    const closeModel = () => {
        setModalOpen(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const navigateHandler = (route) => {
        console.log(route);

        if (route == 'pre'){
            navigate(`/teamDetail?teamCode=${teamInfo.teamCode}`);
        }else{
            navigate('/editTeamNext',{state: {
                    data: teamInfo,
                    chartData: location.state.chartData,
                    files: selectFile
                }});
        }
    }

    const ModalContent = () => {
        switch(selectModal){
            case 'emblemMake':
                return(
                <>
                    <h2>팀 엠블렘</h2>
                    <div className="content-div">
                        <div className="emblem-img-div">
                            <img src={teamIcon} />
                        </div>
                    </div>
                    <div className="button-div">
                        <button type="button" onClick={closeModel}>적용</button>
                        <button type="button" onClick={closeModel}>닫기</button>
                    </div>
                </>
                );
            case 'upload':
                return(
                    <Upload  
                        onClose={closeModel}
                        setTeam={setTeam}
                        team={team}
                        selectImgUrl={selectImgUrl}
                        setSelectImgUrl={setSelectImgUrl}
                        selectFile={selectFile}
                        setSelectFile={setSelectFile}
                    />
                );
            case 'search':
                return(
                    <StadiumSearch 
                        team={team}
                        setTeam={setTeam}
                        onClose={closeModel}    // 모달 함수 전달
                    />
                );
            default:
                return null;    // 기본값 처리
        }
    }

    const inputHandler = (e) => {
        const { name, type, value } = e.target;
        let update = {};

        if (type == 'checkbox'){
            const query = 'input[class="week"]:checked';
            const selectWeek = document.querySelectorAll(query); 
            const weekArr = [];

            selectWeek.forEach(el => {
                weekArr.push(el.value);
            });

            update = {
                ...team,
                week: weekArr
            }
        } else {
            update = {
                ...team,
                [name]: value
            };
        }
        //console.log(team);
        
        setTeam(update);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(team.teamName == ''){
            alert('팀 이름을 입력해주세요');
            document.getElementById('teamName').focus();
            return;
        }

        if(team.teamCode == ''){
            alert('팀 코드를 입력해주세요');
            document.getElementById('teamCode').focus();
            return;
        }

        if(team.week.length == 0){
            alert('요일을 선택해주세요');
            document.getElementById('monday').focus();
            return;
        }
        
        if(team.activeTime == ''){
            alert('활동시간을 선택해주세요');
            document.getElementById('morning').focus();
            return;
        }

        if(team.stadium == ''){
            alert('구장을 선택해주세요')
            document.getElementById('stadium').focus();
            return;
        }

        if(team.age == ''){
            alert('나이를 선택해주세요')
            document.getElementById('age-10').focus();
            return;
        }

        if(team.gender == ''){
            alert('성별을 선택해주세요')
            document.getElementById('man').focus();
            return;
        }

        dispatch(step1_team_info(team));
        // console.log(team);

        navigateHandler('next');
    }

    return(
        <Layout>
            <form onSubmit={submitHandler}>
                <h2>팀 수정하기</h2>
                <div className="flex-div">
                    <div>
                        <p>팀 엠블렘</p>
                        <div className="emblem-div">
                            <div className="icon-div">
                                {selectFile ? <img src={selectImgUrl}/> : <img src={teamInfo.teamImage ? teamInfo.teamImage : teamIcon}/>}
                            </div>
                            <div className="button-div">
                                <button type="button" className="fill-btn" onClick={() => openModel('upload')}>엠블렘 사진 업로드</button>
                                <button type="button" className="outline-btn" onClick={() => openModel('emblemMake')}>엠블렘 만들기</button>
                            </div>
                        </div>
                    </div>
                    <div className="input-div">
                        <p>팀 이름</p>
                        <input type="text" id="teamName" name="teamName" placeholder="팀 이름을 입력해주세요" value={team.teamName} onChange={inputHandler}/>
                        <p>팀 코드</p>
                        <input type="text" id="teamCode" name="teamCode" placeholder="팀 코드를 입력해주세요" value={team.teamCode} onChange={inputHandler} readOnly/>
                    </div>
                </div>
                <div className="date-div">
                    <div className="week-div">
                        <h2>언제 운동하시나요?</h2>
                        <p>정확하지 않아도 괜찮아요</p>
                    </div>
                    <div className="section-week">
                        <p>활동 요일</p>
                        <section className="checkbox-section" onChange={inputHandler}>
                            {week.map((_,idx) => (
                                <>
                                    <input id={engWeek[(idx+1)%7]} name={engWeek[(idx+1)%7]} className="week" type="checkbox" value={(idx+1)%7} defaultChecked={selectedWeek.includes(week[(idx+1)%7])}/>
                                    <label htmlFor={engWeek[(idx+1)%7]} className="checkbox-layout">
                                        <p>{week[(idx+1)%7]}</p>
                                    </label>    
                                </>
                            ))}
                        </section>
                    </div>
                    <div className="time-div">
                        <p>활동 시간</p>
                    </div>
                    <section className="checkbox-section" onChange={inputHandler}>
                        <input id="morning" name="activeTime" className="active-time" type="radio" value="morning" defaultChecked={teamInfo.meetingTime == '아침' ? true : false}/>
                        <label htmlFor="morning" className="checkbox-layout-l">
                            <p>아침</p>
                            <p>06시 ~ 12시</p>
                        </label>
                        <input id="lunch" name="activeTime" className="active-time" type="radio" value="lunch" defaultChecked={teamInfo.meetingTime == '점심' ? true : false}/>
                        <label htmlFor="lunch" className="checkbox-layout-l">
                            <p>점심</p>
                            <p>12시 ~ 18시</p>
                        </label>
                        <input id="dinner" name="activeTime" className="active-time" type="radio" value="dinner" defaultChecked={teamInfo.meetingTime == '저녁' ? true : false}/>
                        <label htmlFor="dinner" className="checkbox-layout-l">
                            <p>저녁</p>
                            <p>18시 ~ 24시</p>
                        </label>
                        <input id="lateNight" name="activeTime" className="active-time" type="radio" value="lateNight" defaultChecked={teamInfo.meetingTime == '심야' ? true : false}/>
                        <label htmlFor="lateNight" className="checkbox-layout-l">
                            <p>심야</p>
                            <p>24시 ~ 06시</p>
                        </label>
                    </section>
                </div>
                <div className="area-div">
                    <div className="area-text">
                        <h2>주로 사용하는 구장은 어디인가요?</h2>
                        <p>가장 먼저 생각나는 구장을 알려주세요</p>
                    </div>
                    <div className="input-box" onClick={() => openModel('search')}>
                        <input type="text" id="stadium" placeholder="홈 구장 검색" value={team.stadium} readOnly/>
                        <img src={search} />
                    </div>
                    <div className="flex-div">
                        <div className="city">
                            <p>도시</p>
                            <input type="text" name="city" placeholder="도시" value={team.city} onChange={inputHandler}/>
                        </div>
                        <div className="area">
                            <p>지역</p>
                            <input type="text" name="area" placeholder="지역" value={team.area} onChange={inputHandler}/>
                        </div>
                    </div>
                </div>
                <div className="peoples-div">
                    <h2>어떤 사람들이 모여있나요?</h2>
                    <div className="age-div">
                        <p>주요 나이대</p>
                        <section className="checkbox-section" onChange={inputHandler}>
                            <input type="radio" id="age-10" name="age" value={10} defaultChecked={teamInfo.teamAge == '10대' ? true : false}/>
                            <label htmlFor="age-10" className="checkbox-layout">
                                <p>10대</p>
                            </label>
                            <input type="radio" id="age-20" name="age" value={20} defaultChecked={teamInfo.teamAge == '20대' ? true : false}/>
                            <label htmlFor="age-20" className="checkbox-layout">
                                <p>20대</p>
                            </label>
                            <input type="radio" id="age-30" name="age" value={30} defaultChecked={teamInfo.teamAge == '30대' ? true : false}/>
                            <label htmlFor="age-30" className="checkbox-layout">
                                <p>30대</p>
                            </label>
                            <input type="radio" id="age-40" name="age" value={40} defaultChecked={teamInfo.teamAge == '40대' ? true : false}/>
                            <label htmlFor="age-40" className="checkbox-layout">
                                <p>40대</p>
                            </label>
                            <input type="radio" id="age-50" name="age" value={50} defaultChecked={teamInfo.teamAge == '50대' ? true : false}/>
                            <label htmlFor="age-50" className="checkbox-layout">
                                <p>50대</p>
                            </label>
                            <input type="radio" id="age-60" name="age" value={60} defaultChecked={teamInfo.teamAge == '60대 이상' ? true : false}/>
                            <label htmlFor="age-60" className="checkbox-layout">
                                <p>60대 이상</p>
                            </label>
                        </section>
                    </div>
                    <div className="gender-div">
                        <p>성별</p>
                        <section className="checkbox-section" onChange={inputHandler}>
                            <input type="radio" id="man" name="gender" value="man" defaultChecked={teamInfo.gender == '남자' ? true : false}/>
                            <label htmlFor="man" className="checkbox-layout-gender" >
                                <p>남</p>
                            </label>
                            <input type="radio" id="woman" name="gender" value="woman" defaultChecked={teamInfo.gender == '여자' ? true : false}/>
                            <label htmlFor="woman" className="checkbox-layout-gender" >
                                <p>여</p>
                            </label>
                            <input type="radio" id="everyone" name="gender" value="everyone" defaultChecked={teamInfo.gender == '남녀모두' ? true : false}/>
                            <label htmlFor="everyone" className="checkbox-layout-gender">
                                <p>남녀모두</p>
                            </label>
                        </section>
                    </div>
                    <div className="button-div">
                        <button type="button" className="outline-btn" onClick={() => navigateHandler('pre')}>이전으로</button>
                        <button type="submit" className="fill-btn">다음으로</button>
                    </div>
                </div>
                <Modal isOpen = {isModalOpen} onClose = {closeModel}>
                    <ModalContent />
                </Modal>
            </form>
        </Layout>
    );
}