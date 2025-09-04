import Header from "../components/Header/Header";
import './match.css';
import DateNavigator from "../components/Match/Matchdate";
import MatchGrid from "../components/Match/Matchgrid";
import { MATCH_LIST }from"C:/develop/React class/study/vite-project/src/data.js";
import { Link } from "react-router-dom";


function HomePage() {
    
    const matchList = MATCH_LIST.map(matchInfo => {
        return (
          <MatchGrid {...matchInfo}/>  
        )
      })
    return(
        <>
            <Header />
            <section id = "content">
                <div class="top-content">
                    <Link to="/">
                        <h2>일정</h2>
                    </Link>
                    <hr/>
                    <Link to="/end"><h2>결과</h2></Link>
                </div>
                <DateNavigator />
                <div class="main-top">
                    <div class="match-filter">
                        <p>지역</p>
                        <p>마감 제외</p>
                        <p>레벨</p>
                        <p>성별</p>
                    </div>
                    <div>
                        <button class="match-add">매치등록</button>
                    </div>
                </div>
                <div class= "match-content">
                    {matchList}
                </div>
            </section>
        </>
    );
}

export default HomePage;