import DateNavigator from "../../components/Match/Matchdate.jsx";
import Layout from '../../layout/Layout';
import { Link } from "react-router-dom"
import "./end.css"
import EndList from "../../components/Match/endlist.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function EndPage() {
    
    const levelData = [
        { name: '비기너', min: 1, max: 3 },
        { name: '아마추어', min: 4, max: 8 },
        { name: '세미프로', min: 9, max: 11 },
        { name: '프로', min: 12, max: 12 },
    ];

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [originalEndList, setOriginalEndList] = useState([]);
    const [filteredEndList, setFilteredEndList] = useState([]);
    const [province, setProvince] = useState([]);
    
    const [filters, setFilters] = useState({
        region: '',
        excludeClosed: false,
        level: 'all',
        gender: 'all'
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/Match/endList');
                setOriginalEndList(response.data.end);
                setProvince(response.data.pro);
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
                setOriginalEndList([]);
                setFilteredEndList([]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
            let list = [...originalEndList];
    
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
    
            setFilteredEndList(list);
        }, [filters, selectedDate, originalEndList]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const List = filteredEndList.map(endInfo => {
            return (
                <Link to={`/end/${endInfo.matchNo}`} key={endInfo.matchNo} className="match-card-link">
                    <EndList {...endInfo} /> 
                </Link>
            )
        });
    return(
        <>
            <Layout>
                <section id="content">
                    <div className="top-content">
                        <Link to="/match">
                            <h2>일정</h2>
                        </Link>
                        <span className="tab-divider">|</span>
                        <Link to="/end" className="active">
                            <h2>결과</h2>
                        </Link>
                    </div>

                    <DateNavigator 
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                    />
                    
                    <div className="filter-bar">
                        <div className="filter-buttons">
                            <select name="region" value={filters.region} onChange={handleFilterChange}>
                                <option value="">지역</option>
                                {province.map((pro) => (<option key={pro.id} value={pro.name}>{pro.name}</option>))}
                            </select>

                            <select name="level" value={filters.level} onChange={handleFilterChange}>
                                <option value="all">레벨</option>
                                {levelData.map((level) => (
                                    <option key={level.name} value={level.name}>
                                        {level.name}
                                    </option>
                                ))}
                            </select>
  
                            <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                                <option value="all">성별</option>
                                <option value="남성">남성</option>
                                <option value="여성">여성</option>
                                <option value="혼성">혼성</option>
                            </select>
                        </div>

                    </div>
                    <div className="end-content">
                        {List.length > 0 ? List : <p>해당 조건의 매치가 없습니다.</p>}
                    </div>
                </section>
            </Layout>
        </>
    )
}
export default EndPage;