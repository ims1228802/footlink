import DateNavigator from "../../components/Match/Matchdate";
import Headers from '../../components/Header/Header';
import { Link } from "react-router-dom"
import "./end.css"
import EndList from "../../components/Match/endlist.jsx";

function EndPage() {

    const endList = END_LIST.map(endInfo => {
        return(
            <EndList {...endInfo} />
        )
    })
    return(
        <>
            <Headers />
            <section id="content">
                <div class="top-content">
                    <Link to="/">
                        <h2>일정</h2>
                    </Link>
                    <hr/>
                    <Link to="/end"><h2>결과</h2></Link>
                </div>
                <DateNavigator />
                <div class="end-filter">
                    <p>지역</p>
                    <p>레벨</p>
                    <p>성별</p>
                </div>

            </section>
        </>
    )
}
export default EndPage;