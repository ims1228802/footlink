import { likeMatchs } from "../../data/user";
import { Love } from "../../assets/icon";

{
  /*
  ** reduce((누적값, 현재값) => { return 새로운누적값*},초기값)
 참고사이트 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 const key = "hello"
 obj[key] = "world"
 -> {hello : "world"}
 */
}

{
  /*찜한매치 날자별로 그룹화 함수*/
}
function groupBy(matches) {
  return matches.reduce((acc, match) => {
    const date = match.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {});
}

{
  /*찜한매치 그룹화*/
}
const grouped = groupBy(LikeMatchs);

export default function LikeMachs() {
  return (
    <div>
      <h3>찜한 매치</h3>

      {Object.entries(grouped).map(([date, matches]) => (
        <div key={date}>
          <div>{date}</div>

          <ul>
            {matches.map((match, idx) => (
              <li key={idx}>
                <div>경기장: {match.Stadium}</div>
                <div>시간: {match.start}</div>
                <div>인원: {match.recruitCount}</div>
                <div>레벨: {match.level}</div>

                <button>
                  <img src={love} alt="찜" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
