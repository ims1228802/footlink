import React, { useState, useEffect } from 'react';
import './selectdetail.css';
import Headers from '../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';
// ✅ 1. 필요한 훅과 액션을 가져옵니다.
import { useSelector, useDispatch } from 'react-redux';
import { saveStep3, createMatchPost, clearForm } from '../../store/matchSlice';

const SelectDetail = () => { // 컴포넌트 이름 PascalCase로 수정
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ 2. 새로운 슬라이스에서 3단계 데이터와 API 상태를 가져옵니다.
    const savedStep3Data = useSelector(state => state.matchCreation.step3_post);
    const { status, error } = useSelector(state => state.matchCreation);

    // ✅ 3. 컴포넌트 내부 상태를 Redux 값으로 초기화합니다.
    const [title, setTitle] = useState(savedStep3Data.title);
    const [content, setContent] = useState(savedStep3Data.content);

    const handleRegister = () => {
        console.log("1. '등록하기' 버튼 클릭됨.");
        const step3Data = { title, content };
        dispatch(saveStep3(step3Data));
        console.log("2. saveStep3 액션 dispatch 완료.");
        console.log("3. createMatchPost 액션 dispatch 시도...");
        dispatch(createMatchPost());
        console.log("4. createMatchPost 액션 dispatch 완료.");
    };

    // ✅ 5. API 요청 상태가 변경될 때마다 처리할 로직 (요청 성공 시 페이지 이동)
    useEffect(() => {
        if (status === 'succeeded') {
            alert('성공!');
            dispatch(clearForm()); // 스토어 초기화 액  션 호출
            navigate('/match');
        }
    }, [status, navigate, dispatch]);   

    return (
        <>
            <Headers />
            <main className="container">
                <div className="register-container">
                    {/* ... (스텝 인디케이터 UI는 동일) ... */}

                    <h1 className="step-title">매치 글 작성</h1>
                    
                    {/* ✅ 6. 제목(title) 입력 필드 추가 (선택사항이지만 일반적으로 사용) */}
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
                        {/* ✅ 7. <Link>를 <button>으로 변경하고 로딩 상태를 적용합니다. */}
                        <button
                            className="next-button"
                            onClick={handleRegister}
                            disabled={status === 'loading'} // 로딩 중일 때 버튼 비활성화
                        >
                            {status === 'loading' ? '등록 중...' : '등록하기'}
                        </button>
                    </div>

                    {/* ✅ 8. API 요청 실패 시 에러 메시지 표시 */}
                    {status === 'failed' && (
                        <div className="error-message">
                            등록에 실패했습니다: {error?.message || '알 수 없는 오류'}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default SelectDetail;