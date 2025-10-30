import Layout from "../../layout/Layout";
import teamIcon from "../../assets/team/team_icon_128.png";
import search from "../../assets/team/search.png";
import "../../css/team/NewTeam.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import axios from "axios";
import { useUser } from "../../hooks/useUser";
import StadiumSearch from "../../components/team/StadiumSearch";
import { step1_team_info } from "../../store/teamSlice";
import Upload from "../../components/Upload";

export default function NewTeam(){
    const navigate = useNavigate();
    const teamSelector = useSelector(state => state.teamCreate.step1_team_info);
    const dispatch = useDispatch();
    const [ isModalOpen, setModalOpen ] = useState(false);
    const [ selectModal, setSelectModel ] = useState('');
    const [ team, setTeam ] = useState(teamSelector);
    const [ selectImgUrl, setSelectImgUrl ] = useState('');
    const [ selectFile, setSelectFile ] = useState(null);
    const { data: user, isLoading } = useUser();

    useEffect(() => {
        const update = {
            ...team,
            userId: user.id
        }
    
        setTeam(update);
    },[]);

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
            navigate('/teamList');
        }else{
            navigate('/newTeamNext', {state: {
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
                <h2>팀 생성하기</h2>
                <div className="flex-div">
                    <div>
                        <p>팀 엠블렘</p>
                        <div className="emblem-div">
                            <div className="icon-div">
                                <img src={selectImgUrl == '' ? teamIcon : selectImgUrl} />
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
                        <input type="text" id="teamCode" name="teamCode" placeholder="팀 코드를 입력해주세요" value={team.teamCode} onChange={inputHandler}/>
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
                            <input id="monday" name="monday" className="week" type="checkbox" value={1}/>
                            <label htmlFor="monday" className="checkbox-layout">
                                <p>월</p>
                            </label>
                            <input id="tuesday" name="tuesday" className="week" type="checkbox" value={2}/>
                            <label htmlFor="tuesday" className="checkbox-layout">
                                <p>화</p>
                            </label>
                            <input id="wednesday" name="wednesday" className="week" type="checkbox" value={3}/>
                            <label htmlFor="wednesday" className="checkbox-layout">
                                <p>수</p>
                            </label>
                            <input id="thursday" name="thursday" className="week" type="checkbox" value={4}/>
                            <label htmlFor="thursday" className="checkbox-layout">
                                <p>목</p>
                            </label>
                            <input id="friday" name="friday" className="week" type="checkbox" value={5}/>
                            <label htmlFor="friday" className="checkbox-layout">
                                <p>금</p>
                            </label>
                            <input id="saturday" name="saturday" className="week" type="checkbox" value={6}/>
                            <label htmlFor="saturday" className="checkbox-layout"> 
                                <p>토</p>
                            </label>
                            <input id="sunday" name="sunday" className="week" type="checkbox" value={0}/>
                            <label htmlFor="sunday" className="checkbox-layout">
                                <p>일</p>
                            </label>
                        </section>
                    </div>
                    <div className="time-div">
                        <p>활동 시간</p>
                    </div>
                    <section className="checkbox-section" onChange={inputHandler}>
                        <input id="morning" name="activeTime" className="active-time" type="radio" value="morning"/>
                        <label htmlFor="morning" className="checkbox-layout-l">
                            <p>아침</p>
                            <p>06시 ~ 12시</p>
                        </label>
                        <input id="lunch" name="activeTime" className="active-time" type="radio" value="lunch"/>
                        <label htmlFor="lunch" className="checkbox-layout-l">
                            <p>점심</p>
                            <p>12시 ~ 18시</p>
                        </label>
                        <input id="dinner" name="activeTime" className="active-time" type="radio" value="dinner"/>
                        <label htmlFor="dinner" className="checkbox-layout-l">
                            <p>저녁</p>
                            <p>18시 ~ 24시</p>
                        </label>
                        <input id="lateNight" name="activeTime" className="active-time" type="radio" value="lateNight"/>
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
                            <input type="radio" id="age-10" name="age" value={10}/>
                            <label htmlFor="age-10" className="checkbox-layout">
                                <p>10대</p>
                            </label>
                            <input type="radio" id="age-20" name="age" value={20}/>
                            <label htmlFor="age-20" className="checkbox-layout">
                                <p>20대</p>
                            </label>
                            <input type="radio" id="age-30" name="age" value={30}/>
                            <label htmlFor="age-30" className="checkbox-layout">
                                <p>30대</p>
                            </label>
                            <input type="radio" id="age-40" name="age" value={40}/>
                            <label htmlFor="age-40" className="checkbox-layout">
                                <p>40대</p>
                            </label>
                            <input type="radio" id="age-50" name="age" value={50}/>
                            <label htmlFor="age-50" className="checkbox-layout">
                                <p>50대</p>
                            </label>
                            <input type="radio" id="age-60" name="age" value={60}/>
                            <label htmlFor="age-60" className="checkbox-layout">
                                <p>60대 이상</p>
                            </label>
                        </section>
                    </div>
                    <div className="gender-div">
                        <p>성별</p>
                        <section className="checkbox-section" onChange={inputHandler}>
                            <input type="radio" id="man" name="gender" value="man"/>
                            <label htmlFor="man" className="checkbox-layout-gender" >
                                <p>남</p>
                            </label>
                            <input type="radio" id="woman" name="gender" value="woman"/>
                            <label htmlFor="woman" className="checkbox-layout-gender" >
                                <p>여</p>
                            </label>
                            <input type="radio" id="everyone" name="gender" value="everyone"/>
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