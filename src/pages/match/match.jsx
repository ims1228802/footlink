import Layout from '../../layout/Layout';
import './match.css';
import DateNavigator from "../../components/Match/Matchdate";
import MatchGrid from "../../components/Match/Matchgrid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const levelData = [
    { name: '비기너', min: 1, max: 3 },
    { name: '아마추어', min: 4, max: 8 },
    { name: '세미프로', min: 9, max: 11 },
    { name: '프로', min: 12, max: 12 },
];

function HomePage() {
    const [originalMatchList, setOriginalMatchList] = useState([]);
    const [filteredMatchList, setFilteredMatchList] = useState([]);
    const [province, setProvince] = useState([]);
    const navigate = useNavigate();
    const { data: user, isLoading } = useUser();

    // 1. 날짜 상태를 HomePage에서 관리
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [filters, setFilters] = useState({
        region: '',
        excludeClosed: false,
        level: 'all',
        gender: 'all'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/Match/matchList');
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

    // 2. 필터링 로직에 'selectedDate'를 추가
    useEffect(() => {
        let list = [...originalMatchList];

        // 날짜 필터링 (가장 먼저 적용하여 목록 크기를 줄이는 것이 효율적)
        // match.matchDate가 "YYYY-MM-DD" 형식의 문자열이라고 가정
        list = list.filter(match => {
            if (!match.matchDate) return false; // 날짜 정보가 없는 데이터는 제외
            const matchDate = new Date(match.matchDate);
            return matchDate.getFullYear() === selectedDate.getFullYear() &&
                   matchDate.getMonth() === selectedDate.getMonth() &&
                   matchDate.getDate() === selectedDate.getDate();
        });

        // 지역 필터링
        if (filters.region) {
            list = list.filter(match => match.region === filters.region);
        }

        // 마감 제외 필터링
        if (filters.excludeClosed) {
            list = list.filter(match => !match.isClosed);
        }

        // 레벨 필터링
        if (filters.level !== 'all') {
            const selectedLevelInfo = levelData.find(l => l.name === filters.level);
            if (selectedLevelInfo) {
                // match.level이 숫자라고 가정
                list = list.filter(match =>
                    match.level >= selectedLevelInfo.min && match.level <= selectedLevelInfo.max
                );
            }
        }

        // 성별 필터링
        if (filters.gender !== 'all') {
            list = list.filter(match => match.genderName === filters.gender);
        }

        setFilteredMatchList(list);
    }, [filters, selectedDate, originalMatchList]); // selectedDate가 변경될 때도 이 useEffect가 실행됨

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const List = filteredMatchList.map(matchInfo => {
        return (
            <Link to={`/match/${matchInfo.matchNo}`} key={matchInfo.matchNo} className="match-card-link">
                <MatchGrid {...matchInfo} />
            </Link>
        )
    });

    return (
        <>
            <Layout>
                <section id="content">
                    <div className="top-content">
                        <h2 onClick={() => navigate("/match")}>일정</h2>
                        <hr />
                        <h2 onClick={() => navigate("/end")}>결과</h2>
                    </div>
                    {/* 3. DateNavigator에 상태와 함수를 props로 전달 */}
                    <DateNavigator
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                    />
                    <div className="main-top">
                        <div className="match-filter">
                            {/* 지역 필터 */}
                            <select name="region" value={filters.region} onChange={handleFilterChange}>
                                <option value="">전체 지역</option>
                                {province.map((pro) => (<option key={pro.id} value={pro.name}>{pro.name}</option>))}
                            </select>

                            {/* 마감 제외 필터 */}
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    name="excludeClosed"
                                    checked={filters.excludeClosed}
                                    onChange={handleFilterChange}
                                />
                                마감 제외
                            </label>

                            {/* 레벨 필터 */}
                            <select name="level" value={filters.level} onChange={handleFilterChange}>
                                <option value="all">모든 레벨</option>
                                {levelData.map((level) => (
                                    <option key={level.name} value={level.name}>
                                        {level.name}
                                    </option>
                                ))}
                            </select>

                            {/* 성별 필터 */}
                            <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                                <option value="all">모든 성별</option>
                                <option value="남성">남성</option>
                                <option value="여성">여성</option>
                                <option value="혼성">혼성</option>
                            </select>
                        </div>
                        <>
                            {user && user.role === 'atrt_01' ? (
                                <Link to="/adminMatch">
                                    <button className="registration-match">결과 등록</button>
                                </Link>
                            ) : null}
                            <Link to="/selectfield">
                                <button className="match-add">매치등록</button>
                            </Link>
                        </>
                    </div>
                    <div className="match-content">
                        {List.length > 0 ? List : <p>해당 조건의 매치가 없습니다.</p>}
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default HomePage;