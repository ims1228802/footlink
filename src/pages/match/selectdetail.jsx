import React, { useState, useEffect } from 'react';
import './selectdetail.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveStep3, createMatchPost, clearForm } from '../../store/matchSlice';
import Layout from '../../layout/Layout';
import { useUser } from '../../hooks/useUser';

const SelectDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: user, isLoading } = useUser();
    const userId = user.id;
    const savedStep3Data = useSelector(state => state.matchCreation.step3_post);
    const { status, error } = useSelector(state => state.matchCreation);

    const [title, setTitle] = useState(savedStep3Data.title);
    const [content, setContent] = useState(savedStep3Data.content);

    const handleRegister = () => {
        console.log("1. '등록하기' 버튼 클릭됨.");
        const step3Data = { title, content, userId };
        dispatch(saveStep3(step3Data));
        console.log("2. saveStep3 액션 dispatch 완료.");
        console.log("3. createMatchPost 액션 dispatch 시도...");
        dispatch(createMatchPost());
        console.log("4. createMatchPost 액션 dispatch 완료.");
    };

    useEffect(() => {
        if (status === 'succeeded') {
            alert('성공!');
            dispatch(clearForm()); 
            navigate('/match');
        }
    }, [status, navigate, dispatch]);   

    return (
        <>
            <Layout>
            <main className="container">
                <div className="register-container">

                    <h1 className="step-title">매치 글 작성</h1>
                    
                    <div className="input-container">
                        <input
                            type="text"
                            className="match-title-input"
                            placeholder="게시글 제목을 입력해주세요."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="textarea-container">
                        <textarea
                            className="match-textarea"
                            placeholder="매치에 대한 추가 정보를 자유롭게 입력해주세요. (예: 진행 방식, 복장, 스케줄 등)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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

                        <button
                            className="next-button"
                            onClick={handleRegister}
                            disabled={status === 'loading'} 
                        >
                            {status === 'loading' ? '등록 중...' : '등록하기'}
                        </button>
                    </div>

                    {status === 'failed' && (
                        <div className="error-message">
                            등록에 실패했습니다: {error?.message || '알 수 없는 오류'}
                        </div>
                    )}
                </div>
            </main>
            </Layout>
        </>
    );
};

export default SelectDetail;