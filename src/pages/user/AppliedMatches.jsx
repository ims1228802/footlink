import React from "react";

export default function AppliedMatches(matches) {
  return (
    <div>
      <h1>Applied Matches</h1>

      {matches.map((matchGroup, index) => (
        <div key={index}>
          <h2>{matchGroup.date}</h2>
          {matchGroup.games.map((game, idx) => (
            <div key={idx}>
              <div>
                <p>
                  <strong>Time:</strong> {game.time}
                </p>
                <p>
                  <strong>Opponent Team:</strong> {game.team}
                </p>
                <p>
                  <strong>Location:</strong> {game.location}
                </p>
              </div>
              <div>{game.status}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
