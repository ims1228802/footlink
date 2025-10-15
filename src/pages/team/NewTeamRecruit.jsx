import search from "../../assets/team/search.png";
import "../../css/team/NewTeamRecruit.css";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

export default function NewTeamRecruit(){

    const navigate = useNavigate();

    const navigateHandler = (route) => {
        if(route = 'pre'){
            navigate('/teamList');
        }else{
            navigate('/newTeamRecruitNext');
        }
    }

    return(
            <Layout>
                <main>
                    <h2>팀원 모집하기</h2>
                    <div className="date-div">
                        <div className="week-div">
                            <h2>팀 특징이 무엇인가요?</h2>
                        </div>
                        <div className="section-week">
                            <section className="checkbox-section">
                                <input id="self-war" name="self-war" type="checkbox" />
                                <label for="self-war" className="checkbox-layout">
                                    <p>자체전 위주로 해요</p>
                                </label>
                                <input id="tournament" name="tournament" type="checkbox" />
                                <label for="tournament" className="checkbox-layout">
                                    <p>대회를 준비해요</p>
                                </label>
                                <input id="team-match" name="team-match" type="checkbox" />
                                <label for="team-match" className="checkbox-layout">
                                    <p>팀 매칭 위주로 해요</p>
                                </label>
                                <input id="together" name="together" type="checkbox" />
                                <label for="together" className="checkbox-layout">
                                    <p>함께 실력을 키워요</p>
                                </label>
                                <input id="coach" name="coach" type="checkbox" />
                                <label for="coach" className="checkbox-layout">
                                    <p>전문 코치님이 있어요</p>
                                </label>
                            </section>
                        </div>
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
                        <h2>어떤 사람들을 모집하실건가요?</h2>
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
                        <div className="level-div">
                            <p>레벨</p>
                            <section className="checkbox-section">
                                <input id="self-war" name="self-war" type="checkbox" />
                                <label for="self-war" className="checkbox-layout">
                                    <p>실력무관</p>
                                </label>
                                <input id="tournament" name="tournament" type="checkbox" />
                                <label for="tournament" className="checkbox-layout">
                                    <p>비기너</p>
                                </label>
                                <input id="team-match" name="team-match" type="checkbox" />
                                <label for="team-match" className="checkbox-layout">
                                    <p>아마추어</p>
                                </label>
                                <input id="together" name="together" type="checkbox" />
                                <label for="together" className="checkbox-layout">
                                    <p>세미프로</p>
                                </label>
                                <input id="coach" name="coach" type="checkbox" />
                                <label for="coach" className="checkbox-layout">
                                    <p>프로</p>
                                </label>
                            </section>
                        </div>
                        <div className="button-div">
                            <button type="button" onClick={() => navigateHandler('pre')}>이전으로</button>
                            <button type="button" onClick={() => navigateHandler('next')}>다음으로</button>
                        </div>
                    </div>
                </main>
            </Layout>
    );
}