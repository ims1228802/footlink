import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/team/NewTeamNext.css";

export default function NewTeamRecruitNext() {
    return(
        <>
            <Header />
            <main>
                <div className="level-text">
                    <h2>팀 레벨을 선택해주세요</h2>
                    <p>팀의 평균 실력을 알려주세요</p>
                </div>
                <div className="level-div">
                    <div className="level-select-text">
                        <h2>비기너</h2>
                        <p>축구를 처음 시작하는 단계에요</p>
                    </div>
                    <div className="level-select">
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                        <div className="select-area"></div>
                    </div>
                    <div className="level-line">
                        <div className="level-beginner"></div>
                        <div className="level-amateur"></div>
                        <div className="level-semi-pro"></div>
                        <div className="level-pro"></div>
                    </div>
                </div>
                <div className="team-stats">
                    <h2>팀 능력치를 설정해주세요</h2>
                    <div className="chart-div">
                        chart-view
                    </div>
                    <div className="stats-div">
                        <div className="slider-container">
                            <p>공격</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>스피드</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>드리블</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>체력</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>수비</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>피지컬</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>패스</p>
                            <input type="range" min="0" max="10" />
                        </div>
                        <div className="slider-container">
                            <p>슛</p>
                            <input type="range" min="0" max="10" />
                        </div>
                    </div>
                </div>
                <div className="button-div">
                    <button>이전으로</button>
                    <button>다음으로</button>
                </div>
            </main>
            <Footer />
        </>
    );
}