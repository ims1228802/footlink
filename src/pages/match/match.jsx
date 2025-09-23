import Headers from '../../components/Header/Header';
import './match.css';
import DateNavigator from "../../components/Match/Matchdate";
import MatchGrid from "../../components/Match/Matchgrid";
// import { MATCH_LIST } from"../data/matchlist";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
    const [testData, setTestData] = useState([]);

     useEffect(() => {
    // useEffect 내부에 async 함수를 정의하고 호출하는 방식으로 수정
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Match');
        console.log('API로부터 받은 데이터:', response.data.test);
        setTestData(response.data.test);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        setTestData("데이터를 불러오지 못했습니다.");
         }
     };
        fetchData();
    }, []);
    

    // const matchList = MATCH_LIST.map(matchInfo => {
    //     return (
    //       <MatchGrid key={matchInfo.id} {...matchInfo}/> 
    //     )
    //   })
    return(
        <>
            <Headers />
            <section id = "content">
                <div className="top-content">
                    <Link to="/">
                        <h2>일정</h2>
                    </Link>
                    <hr/>
                    <Link to="/end"><h2>결과</h2></Link>
                </div>
                <DateNavigator />
                <div className="main-top">
                    <div className="match-filter">
                        <p>지역</p>
                        <p>마감 제외</p>
                        <p>레벨</p>
                        <p>성별</p>
                    </div>
                    <div>
                        <Link to="/selectfield">
                          <button className="match-add">매치등록</button>
                        </Link>
                    </div>
                </div>
                <div className= "match-content">
                    {/* {matchList} */}
                </div>
            </section>
        </>
    );
}

export default HomePage;