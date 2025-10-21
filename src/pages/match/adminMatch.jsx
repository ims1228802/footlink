import React from 'react';
import { Link } from 'react-router-dom';
import "./adminMatch.css";

// 1. 컴포넌트 밖이나 state에서 매치 데이터를 관리합니다.
const myMatches = [
    {
        id: 'M-1024',
        date: '2025-10-20 (월)',
        time: '19:00 - 21:00',
        field: '용산 아이파크몰 풋살장',
        status: '모집중',
        statusColor: 'green',
        apply: '3 / 6 (팀)',
        action: 'modify'
    },
    {
        id: 'M-1023',
        date: '2025-10-18 (토)',
        time: '10:00 - 12:00',
        field: '수원 월드컵 보조구장',
        status: '모집완료',
        statusColor: 'red',
        apply: '6 / 6 (팀)',
        action: 'result'
    },
    {
        id: 'M-1020',
        date: '2025-10-15 (수)',
        time: '20:00 - 22:00',
        field: '고양 어울림누리 풋살장',
        status: '경기종료',
        statusColor: 'gray',
        apply: '-',
        action: 'done'
    }
];

// 버튼을 동적으로 렌더링하는 헬퍼 컴포넌트 (선택 사항)
const MatchActions = ({ action, matchId }) => {
    if (action === 'modify') {
        return (
            <>
                <Link to={`/match/edit/${matchId}`} className="btn btn-sm btn-outline-primary">수정</Link>
                <button className="btn btn-sm btn-outline-danger">취소</button>
            </>
        );
    }
    if (action === 'result') {
        return <Link to={`/match/result/${matchId}`} className="btn btn-sm btn-outline-primary">결과입력</Link>;
    }
    if (action === 'done') {
        return <button className="btn btn-sm btn-outline-secondary" disabled>완료</button>;
    }
    return null;
};


function AdminMatch() {
    return (
        <section className="mypage-contents">
            <div className="content-header">
                <h2 className="content-title" style={{ color: 'white', marginTop: '30px' }}>
                    나의 매치 관리
                </h2>
            </div>

            {/* common.css에 .card 스타일이 없다면, main.css를 import 해야 합니다. */}
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>매치 ID</th>
                                    <th>날짜</th>
                                    <th>시간</th>
                                    <th>구장</th>
                                    <th>상태</th>
                                    <th>신청 현황</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 2. 데이터를 map()으로 순회하며 렌더링 */}
                                {myMatches.map((match) => (
                                    <tr key={match.id} className="text-center">
                                        <td>{match.id}</td>
                                        <td>{match.date}</td>
                                        <td>{match.time}</td>
                                        <td>{match.field}</td>
                                        <td><span style={{ color: match.statusColor }}>{match.status}</span></td>
                                        <td>{match.apply}</td>
                                        <td>
                                            <MatchActions action={match.action} matchId={match.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 페이지네이션 (이 부분도 데이터에 따라 동적으로 생성해야 함) */}
            <div className="pagination-area mt-30 mb-50">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <Link className="page-link" to="#">&lt;</Link>
                        </li>
                        <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                            <Link className="page-link" to="#">&gt;</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default AdminMatch;