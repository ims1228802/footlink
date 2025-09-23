import React, { useState } from 'react';
import './selectdetail.css';
import Headers from '../../components/Header/Header';
import { Link , useNavigate } from 'react-router-dom'; 

const selectDetail = () => {
    const [matchDetails, setMatchDetails] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        // 매치 등록 로직
        console.log('매치 등록 정보:', matchDetails);
        alert('매치가 성공적으로 등록되었습니다!');
        navigate('/');
    };

    return (
        <>
            <Headers />
            <main className="container">
                <div className="register-container">
                    <div className="step-indicators">
                        <div className="step-item">
                            <span>1. 구장과 시간</span>
                        </div>
                        <div className="step-item">
                            <span>2. 인원 및 레벨</span>
                        </div>
                        <div className="step-item active">
                            <span>3. 매치 글 작성</span>
                        </div>
                    </div>

                    <h1 className="step-title">매치 글 작성</h1>

                    <div className="textarea-container">
                        <textarea
                            className="match-textarea"
                            placeholder="매치에 대한 추가 정보를 자유롭게 입력해주세요. (예: 진행 방식, 복장, 스케줄 등)"
                            value={matchDetails}
                            onChange={(e) => setMatchDetails(e.target.value)}
                        />
                    </div>

                    <div className="info-box">
                        <p className="info-title">이런 내용이 포함되어 있으면 좋아요!</p>
                        <ul className="info-list">
                            <li>진행 방식</li>
                            <li>복장 안내</li>
                            <li>스케줄 구성</li>
                        </ul>
                    </div>

                    <div className="button-group">
                        <Link to="/selectmatch" className="back-button">
                            이전으로
                        </Link>
                        <Link to="/" className="next-button" onClick={handleRegister}>
                            등록하기
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default selectDetail;