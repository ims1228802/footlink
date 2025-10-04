import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../css/team/NewTeamNext.css";
import "../../css/team/NewTeamRecruitNext.css";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";

export default function NewTeamRecruitNext() {


    const navigate = useNavigate();

    const navigateHandler = (route) => {
        if(route = 'pre'){
            navigate('/newTeamRecruit');
        }else{
            navigate('/teamList');
        }
    }

    return(
        <Layout>
        <main>
            <div className="recruit-text">
                <h2>팀원 모집하기</h2>
                <p>우리팀을 소개해주세요.</p>
            </div>
            <div className="recruit-div">
                <div className="recruit-select-button">
                    <button type="button">팀 단체사진 추가</button>
                </div>
            </div>
            <div className="recruit-content">
                
            </div>
            <div className="recruit-info">
                <h2>이런 내용이 포함되어 있으면 좋아요!</h2>
                <ul>
                    <li>· 주로 활동하는 구장</li>
                    <li>· 현재 멤버 수</li>
                    <li>· 스케줄 구성</li>
                    <li>· 가입 절차</li>
                </ul>
            </div>
            <div className="button-div">
                <button type="button" onClick={() => navigateHandler('pre')}>이전으로</button>
                <button> type="button" onClick={() => navigateHandler('next')}등록하기</button>
            </div>
        </main>
        </Layout>
    );
}