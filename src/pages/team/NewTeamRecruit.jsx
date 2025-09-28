import Footer from "../../components/Footer";
import Header from "../../components/Header";
import teamIcon from "../../assets/team/team_icon_128.png";
import search from "../../assets/team/search.png";
import "../../css/team/NewTeam.css";

export default function NewTeamRecruit(){
    return(
        <>
            <Header />
                <main>
                    <h2>팀원 모집하기</h2>
                    <div className="date-div">
                        <div className="week-div">
                            <h2>언제 운동하시나요?</h2>
                            <p>정확하지 않아도 괜찮아요</p>
                        </div>
                        <div className="section-week">
                            <p>활동 요일</p>
                            <section className="checkbox-section">
                                <input id="monday" name="monday" type="checkbox" />
                                <label for="monday" className="checkbox-layout">
                                    <p>월</p>
                                </label>
                                <input id="tuesday" name="tuesday" type="checkbox" />
                                <label for="tuesday" className="checkbox-layout">
                                    <p>화</p>
                                </label>
                                <input id="wednesday" name="wednesday" type="checkbox" />
                                <label for="wednesday" className="checkbox-layout">
                                    <p>수</p>
                                </label>
                                <input id="thursday" name="thursday" type="checkbox" />
                                <label for="thursday" className="checkbox-layout">
                                    <p>목</p>
                                </label>
                                <input id="friday" name="friday" type="checkbox" />
                                <label for="friday" className="checkbox-layout">
                                    <p>금</p>
                                </label>
                                <input id="saturday" name="saturday" type="checkbox" />
                                <label for="saturday" className="checkbox-layout"> 
                                    <p>토</p>
                                </label>
                                <input id="sunday" name="sunday" type="checkbox" />
                                <label for="sunday" className="checkbox-layout">
                                    <p>일</p>
                                </label>
                            </section>
                        </div>
                        <div className="time-div">
                            <p>활동 시간</p>
                        </div>
                        <section className="checkbox-section">
                            <input id="morning" name="morning" type="checkbox" />
                            <label for="morning" className="checkbox-layout-l">
                                <p>아침</p>
                                <p>06시 ~ 12시</p>
                            </label>
                            <input id="lunch" name="lunch" type="checkbox" />
                            <label for="lunch" className="checkbox-layout-l">
                                <p>점심</p>
                                <p>12시 ~ 18시</p>
                            </label>
                            <input id="dinner" name="dinner" type="checkbox" />
                            <label for="dinner" className="checkbox-layout-l">
                                <p>저녁</p>
                                <p>18시 ~ 24시</p>
                            </label>
                            <input id="late-night" name="late-night" type="checkbox" />
                            <label for="late-night" className="checkbox-layout-l">
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
                        <div className="input-box">
                            <input type="text" placeholder="홈 구장 검색"/>
                            <img src={search} />
                        </div>
                        <div className="flex-div">
                            <div className="city">
                                <p>도시</p>
                                <input type="text" placeholder="도시"/>
                            </div>
                            <div className="area">
                                <p>지역</p>
                                <input type="text" placeholder="지역"/>
                            </div>
                        </div>
                    </div>
                    <div className="peoples-div">
                        <h2>어떤 사람들이 모여있나요?</h2>
                        <div className="age-div">
                            <p>주요 나이대</p>
                            <section className="checkbox-section">
                                <input type="radio" id="age-10" name="age"/>
                                <label for="age-10" className="checkbox-layout">
                                    <p>10대</p>
                                </label>
                                <input type="radio" id="age-20" name="age"/>
                                <label for="age-20" className="checkbox-layout">
                                    <p>20대</p>
                                </label>
                                <input type="radio" id="age-30" name="age"/>
                                <label for="age-30" className="checkbox-layout">
                                    <p>30대</p>
                                </label>
                                <input type="radio" id="age-40" name="age"/>
                                <label for="age-40" className="checkbox-layout">
                                    <p>40대</p>
                                </label>
                                <input type="radio" id="age-50" name="age"/>
                                <label for="age-50" className="checkbox-layout">
                                    <p>50대</p>
                                </label>
                                <input type="radio" id="age-60" name="age"/>
                                <label for="age-60" className="checkbox-layout">
                                    <p>60대 이상</p>
                                </label>
                            </section>
                        </div>
                        <div className="gender-div">
                            <p>성별</p>
                            <section className="checkbox-section">
                                <input type="radio" id="man" name="gender"/>
                                <label for="man" className="checkbox-layout-gender">
                                    <p>남</p>
                                </label>
                                <input type="radio" id="woman" name="gender"/>
                                <label for="woman" className="checkbox-layout-gender">
                                    <p>여</p>
                                </label>
                                <input type="radio" id="everyone" name="gender"/>
                                <label for="everyone" className="checkbox-layout-gender">
                                    <p>남녀모두</p>
                                </label>
                            </section>
                        </div>
                        <div className="button-div">
                            <button>이전으로</button>
                            <button>다음으로</button>
                        </div>
                    </div>
                    
                </main>
            <Footer />
        </>
    );
}