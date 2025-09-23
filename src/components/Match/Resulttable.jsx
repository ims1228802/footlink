import teamimg from "../../../public/Teamicon.svg"

export default function ResultTable({name, status, players}) {
    return (
        <div>
            <div class="homeuser-arr">
                <img src={teamimg} style={{ width: '50px', margin: '5px' }} />
                <p>{name}</p>
                <div className = {status == "승" ? "win-box" : "lose-box"}>
                    {status}
                </div>
            </div>
            <div class="homeuser-table">
                <table style={{ width: '1024px' }}>
                    <thead style={{ backgroundColor: 'silver' }}>
                        <tr>
                            <th>이름</th>
                            <th>레벨</th>
                            <th>골</th>
                            <th>어시</th>
                            <th>세이브</th>
                        </tr>
                    </thead>
                    <tbody style={{ width: '1024px', textAlign: 'center' }}>
                        {players.map((players, index) => (
                            <tr key={index}>
                                <td>{players.name}</td>
                                <td>{players.level}</td>
                                <td>{players.goals}</td>
                                <td>{players.assists}</td>
                                <td>{players.saves}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}