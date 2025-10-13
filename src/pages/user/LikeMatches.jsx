import likeMatches from "../../data/likeMatches";
import "../../css/user/LikeMatches.css";
import love from "../../assets/icon/love.svg";

function groupBy(matches) {
  return matches.reduce((acc, match) => {
    const date = match.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {});
}

const grouped = groupBy(likeMatches);

export default function LikeMatches() {
  return (
    <div className="like-container">
      <h3 className="like-title">찜한매치</h3>
      <div className="like-separator">
        {Object.entries(grouped).map(([date, matches]) => (
          <div key={date} className="like-date-group">
            <div className="like-date">{date}</div>

            <ul className="like-list">
              {matches.map((match) => (
                <li key={match.id} className="like-card">
                  <div className="like-time-wrap">
                    <div className={`like-status ${match.status}`}>
                      {match.status}
                    </div>
                    <div className="like-time">{match.start}</div>
                  </div>

                  <div className="like-info">
                    <div className="like-stadium">{match.stadium}</div>
                    <div className="like-state-group">
                      <div className="like-tags">
                        <span>{match.gender}</span> |{" "}
                        <span>{match.matchType}</span>
                      </div>
                      <div className="like-meta">
                        모집현황 : {match.recruitCount}
                      </div>
                      <div className="like-organizer">
                        {match.organizer} • {match.level}
                      </div>
                    </div>
                  </div>

                  <button className="like-btn">
                    <img src={love} alt="찜" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
