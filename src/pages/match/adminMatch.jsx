import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./adminMatch.css";
import axios from "axios";


const toYYYYMMDD = (date) => {
    if (!date) return ''; 
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

function AdminMatch() {
    const [originalMatchList, setOriginalMatchList] = useState([]);   
    const [province, setProvince] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredMatchList, setFilteredMatchList] = useState([]);

    const [filters, setFilters] = useState({
        region: '',
        excludeClosed: false,
        level: 'all',
        gender: 'all'
    });
    const MatchActions = ({ status, matchNo }) => {
        switch (status) {
            case '모집중':
                return null
         case '모집 완료': 
            return <Link to={`/addResult/${matchNo}`} className="btn btn-sm btn-outline-primary">결과입력</Link>;
        
         case '매치 종료':
            return(
                <>
                    <Link to={`/match/edit/${matchNo}`} className="btn btn-sm btn-outline-primary">수정</Link>
                    <button className="btn btn-sm btn-outline-danger">취소</button>
                </>
            )
        default:
            return null;
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/Match/admin');
                setOriginalMatchList(response.data.matchList);
                console.log(response.data.matchList);
                setProvince(response.data.pro);
                
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
                setOriginalMatchList([]);
                setFilteredMatchList([]);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
            let list = [...originalMatchList];
    
            if (selectedDate) {
                const targetDateString = toYYYYMMDD(selectedDate);
                list = list.filter(match => {
                    if (!match.matchDate) return false;
                    return match.matchDate === targetDateString;
                });
            }
    
            // 지역 필터링
            if (filters.region) {
                list = list.filter(match => match.region === filters.region);
            }
    
            // 마감 제외 필터링
            if (filters.excludeClosed) {
                list = list.filter(match => !match.isClosed);
            }
    
            // 성별 필터링
            if (filters.gender !== 'all') {
                list = list.filter(match => match.genderName === filters.gender);
            }
    
            setFilteredMatchList(list);
        }, [filters, selectedDate, originalMatchList]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleDateChange = (e) => {
        setSelectedDate(new Date(e.target.value + 'T00:00:00'));
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case '모집중':
                return { color: 'green', fontWeight: 'bold' };
            case '모집 완료':
                return { color: 'red', fontWeight: 'bold' };
            case '매치 종료':
                return { color: 'gray' };
            default:
                return { color: 'black' }; // 기본값
        }
    };
    return (
        <section className="mypage-contents">
            <div className="content-header">
                <h2 className="content-title" style={{ color: 'white', marginTop: '30px' }}>
                    나의 매치 관리
                </h2>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>매치 NO</th>
                                    <th>
                                        <div className="card-body d-flex justify-content-center align-items-center">
                                            <label htmlFor="match-date-picker" className="form-label me-3 mb-0 fw-bold">날짜:</label>
                                            <input
                                                type="date"
                                                id="match-date-picker"
                                                className="form-control"
                                                style={{ width: '200px' }}
                                                value={toYYYYMMDD(selectedDate)} 
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </th>
                                    <th>시간</th>
                                    <th>
                                        <select name="region" value={filters.region} onChange={handleFilterChange}>
                                            <option value="">전체 지역</option>
                                            {province.map((pro) => (<option key={pro.id} value={pro.name}>{pro.name}</option>))}
                                        </select>
                                    </th>
                                    <th>구장</th>
                                    <th>상태</th>
                                    <th>신청 현황</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMatchList.map((match) => (
                                    <tr key={match.matchNo} className="text-center">
                                        <td>{match.matchNo}</td>
                                        <td>{match.matchDate}</td>
                                        <td>{match.matchTime?.substring(0, 5)} - {match.matchEndTime?.substring(0, 5)}</td>
                                        <td>{match.region}</td>
                                        <td>{match.staName}</td>
                                        <td>
                                            <span style={getStatusStyle(match.matchStts)}>
                                                {match.matchStts}
                                            </span>
                                        </td>
                                        <td>{match.applyCount}/{match.totalPlayers}</td>
                                        <td>
                                            <MatchActions status={match.matchStts} matchNo={match.matchNo} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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