import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './adminMatch.css';
import './AddResult.css';
import Layout from '../../layout/Layout';
import axios from 'axios';


const createInitialStats = () => Array.from({ length: 5 }, () => ({
    playerId: '',
    goal: 0,
    assist: 0,
    save: 0
}));

const createGame = (gameNumber) => ({
    gameNumber: gameNumber,
    selectedTeamA: '',
    selectedTeamB: '',
    teamAStats: createInitialStats(),
    teamBStats: createInitialStats()
});

function MatchResultEdit() { 
    const { matchNo } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1);
    const [playerList, setPlayerList] = useState([]); 
    const [teamList, setTeamList] = useState([]);     
    const [games, setGames] = useState([]);           
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);  

    useEffect(() => {
        const fetchMatchData = async () => {
            setIsLoading(true);
            try {
                const listResponse = await axios.get(`http://localhost/api/Match/partiList/${matchNo}`);
                const playerData = listResponse.data.partiList || [];
                setPlayerList(playerData);
                const teams = new Map();
                playerData.forEach(player => {
                    if (player.teamCd && player.teamName) {
                        const codes = String(player.teamCd).split(', ');
                        const names = String(player.teamName).split(', ');
                        codes.forEach((code, index) => {
                            if (!teams.has(code)) {
                                teams.set(code, names[index]);
                            }
                        });
                    }
                });
                const uniqueTeamList = Array.from(teams, ([code, name]) => ({ teamCd: code, teamName: name }));
                setTeamList(uniqueTeamList);

                const resultResponse = await axios.get(`http://localhost/api/Match/endMatch/${matchNo}`);
                const savedGames = resultResponse.data.EndMatchInfo || [];

                if (savedGames && savedGames.length > 0) {
                    setGames(savedGames);
                    setActiveTab(1); 
                } else {
                    setGames([createGame(1)]);
                    alert('저장된 경기 결과가 없습니다. 새로 입력해주세요.');
                }

            } catch (error) {
                console.error("데이터 로딩 중 오류 발생:", error);
                alert('경기 정보를 불러오는데 실패했습니다.');
                setGames([createGame(1)]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchData();
    }, [matchNo]);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const handleAddGame = () => {
        const newGameNumber = games.length + 1;
        setGames(prevGames => [
            ...prevGames,
            createGame(newGameNumber)
        ]);
        setActiveTab(newGameNumber);
    };

    const handleTeamChange = (team, teamId) => {
        setGames(prevGames =>
            prevGames.map(game => {
                if (game.gameNumber === activeTab) {
                    const fieldToUpdate = team === 'A' ? 'selectedTeamA' : 'selectedTeamB';
                    return { ...game, [fieldToUpdate]: teamId };
                }
                return game;
            })
        );
    };

    const handleStatChange = (team, index, field, value) => {
        const processedValue = (field === 'goal' || field === 'assist' || field === 'save')
                                ? Number(value) : value;
        setGames(prevGames =>
            prevGames.map(game => {
                if (game.gameNumber === activeTab) {
                    const statsField = team === 'A' ? 'teamAStats' : 'teamBStats';
                    const newStats = game[statsField].map((stat, i) => {
                        if (i === index) {
                            return { ...stat, [field]: processedValue };
                        }
                        return stat;
                    });
                    return { ...game, [statsField]: newStats };
                }
                return game;
            })
        );
    };

    const handleUpdateResult = async () => {
        if (isSaving) return;

        const invalidGame = games.find(g =>
            !g.selectedTeamA || 
            !g.selectedTeamB || 
            g.teamAStats.some(s => !s.playerId) || 
            g.teamBStats.some(s => !s.playerId)    
        );

        if (invalidGame) {
            alert(`${invalidGame.gameNumber}경기의 팀 또는 선수 입력을 완료해주세요.`);
            handleTabClick(invalidGame.gameNumber); 
            return;
        }
         const resultData = {
             matchNo: Number(matchNo),
             games: games
         };
         console.log("서버로 전송할 수정 데이터:", resultData);

         setIsSaving(true);
         try {
             const response = await axios.put(
                 `http://localhost/api/Match/update-results`, 
                 resultData
             );
         } catch (error) {
         } finally {
             setIsSaving(false);
             navigate('/adminMatch');
         }
    };

    const currentGame = games.find(g => {
        console.log('타입 확인 -> Game Number:', typeof g.gameNumber, 'Active Tab:', typeof activeTab);
        return g.gameNumber === activeTab;
    });
    const totalAGoal = currentGame?.teamAStats.reduce((sum, stat) => sum + (Number(stat.goal) || 0), 0) || 0;
    const totalAAssist = currentGame?.teamAStats.reduce((sum, stat) => sum + (Number(stat.assist) || 0), 0) || 0;
    const totalASave = currentGame?.teamAStats.reduce((sum, stat) => sum + (Number(stat.save) || 0), 0) || 0;
    const totalBGoal = currentGame?.teamBStats.reduce((sum, stat) => sum + (Number(stat.goal) || 0), 0) || 0;
    const totalBAssist = currentGame?.teamBStats.reduce((sum, stat) => sum + (Number(stat.assist) || 0), 0) || 0;
    const totalBSave = currentGame?.teamBStats.reduce((sum, stat) => sum + (Number(stat.save) || 0), 0) || 0;

    if (isLoading) {
        return (
            <Layout>
                <section className="mypage-contents">
                    <div className="content-header">
                        <h2 className="content-title" style={{ color: 'white', marginTop: '30px' }}>
                            매치 결과 로딩 중...
                        </h2>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <p>데이터를 불러오고 있습니다...</p>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <>
            <Layout>
                <section className="mypage-contents">
                    <div className="content-header">
                        <h2 className="content-title" style={{ color: 'white', marginTop: '30px' }}/>
                            <ul className="result-tabs">
                                {games.map(game => (
                                    <li
                                        key={game.gameNumber}
                                        className={`tab-item ${activeTab === game.gameNumber ? 'active' : ''}`}
                                        onClick={() => !isSaving && handleTabClick(game.gameNumber)} 
                                    >
                                        {game.gameNumber}경기
                                    </li>
                                ))}
                                {/* 경기 추가 버튼 (수정 페이지에서는 필요 없을 수 있음) */}
                                {/* 필요하다면 아래 주석 해제 */}
                                {/*
                                <li className="tab-item add-game" onClick={!isSaving ? handleAddGame : undefined}>
                                    + 경기 추가
                                </li>
                                */}
                            </ul>
                            <div className="tab-content">
                                {!currentGame ? (
                                    <div>
                                        {games.length > 0 ? '경기를 선택해주세요.' : '저장된 경기 결과가 없습니다.'}
                                    </div>
                                ) : (
                                    <div className="game-container">
                                        <div className="team-table-wrapper">
                                            <select
                                                className="form-select team-select mb-3"
                                                value={currentGame.selectedTeamA}
                                                onChange={(e) => handleTeamChange('A', e.target.value)}
                                                disabled={isSaving} 
                                            >
                                                <option value="">A팀 선택</option>
                                                {teamList.map((team) => (
                                                    <option key={team.teamCd} value={team.teamCd}>
                                                        {team.teamName}
                                                    </option>
                                                ))}
                                            </select>
                                            <table className="table table-bordered stat-table">
                                                <thead>
                                                    <tr>
                                                        <th>선수</th>
                                                        <th>골</th>
                                                        <th>어시</th>
                                                        <th>세이브</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentGame.teamAStats.map((stat, index) => (
                                                        <tr key={`A-${index}`}> {/* key 수정 */}
                                                            <td>
                                                                <select
                                                                    className="form-select player-select"
                                                                    value={stat.playerId}
                                                                    onChange={(e) => handleStatChange('A', index, 'playerId', e.target.value)}
                                                                    disabled={isSaving}
                                                                >
                                                                    <option value="">선수 선택</option>
                                                                    {playerList.map((player) => (
                                                                        <option key={player.userId} value={player.userId}>
                                                                            {player.userName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number" min="0"
                                                                    value={stat.goal}
                                                                    onChange={(e) => handleStatChange('A', index, 'goal', e.target.value)}
                                                                    className="form-control form-control-sm stat-input"
                                                                    disabled={isSaving}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number" min="0"
                                                                    value={stat.assist}
                                                                    onChange={(e) => handleStatChange('A', index, 'assist', e.target.value)}
                                                                    className="form-control form-control-sm stat-input"
                                                                    disabled={isSaving}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number" min="0"
                                                                    value={stat.save}
                                                                    onChange={(e) => handleStatChange('A', index, 'save', e.target.value)}
                                                                    className="form-control form-control-sm stat-input"
                                                                    disabled={isSaving}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>계</td>
                                                        <td>{totalAGoal}</td>
                                                        <td>{totalAAssist}</td>
                                                        <td>{totalASave}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        {/* 오른쪽 팀 테이블 */}
                                        <div className="team-table-wrapper">
                                            <select
                                                className="form-select team-select mb-3"
                                                value={currentGame.selectedTeamB}
                                                onChange={(e) => handleTeamChange('B', e.target.value)}
                                                disabled={isSaving}
                                            >
                                                <option value="">B팀 선택</option>
                                                {teamList.map((team) => (
                                                    <option key={team.teamCd} value={team.teamCd}>
                                                        {team.teamName}
                                                    </option>
                                                ))}
                                            </select>
                                            <table className="table table-bordered stat-table">
                                                <thead>
                                                    <tr>
                                                        <th>선수</th>
                                                        <th>골</th>
                                                        <th>어시</th>
                                                        <th>세이브</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentGame.teamBStats.map((stat, index) => (
                                                        <tr key={`B-${index}`}> {/* key 수정 */}
                                                            <td>
                                                                <select
                                                                    className="form-select player-select"
                                                                    value={stat.playerId}
                                                                    onChange={(e) => handleStatChange('B', index, 'playerId', e.target.value)}
                                                                    disabled={isSaving}
                                                                >
                                                                    <option value="">선수 선택</option>
                                                                    {playerList.map((player) => (
                                                                        <option key={player.userId} value={player.userId}>
                                                                            {player.userName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number" min="0"
                                                                    value={stat.goal}
                                                                    onChange={(e) => handleStatChange('B', index, 'goal', e.target.value)}
                                                                    className="form-control form-control-sm stat-input"
                                                                    disabled={isSaving}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number" min="0"
                                                                    value={stat.assist}
                                                                    onChange={(e) => handleStatChange('B', index, 'assist', e.target.value)}
                                                                    className="form-control form-control-sm stat-input"
                                                                    disabled={isSaving}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number" min="0"
                                                                    value={stat.save}
                                                                    onChange={(e) => handleStatChange('B', index, 'save', e.target.value)}
                                                                    className="form-control form-control-sm stat-input"
                                                                    disabled={isSaving}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>계</td>
                                                        <td>{totalBGoal}</td>
                                                        <td>{totalBAssist}</td>
                                                        <td>{totalBSave}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 결과 수정 버튼 */}
                            <div className="save-button-container">
                                <button
                                    className="btn btn-save-result" 
                                    onClick={handleUpdateResult} 
                                    disabled={isSaving}
                                >
                                    {isSaving ? '수정 중...' : '결과 수정'} 
                                </button>
                            </div>
                        </div>
                </section>
            </Layout>
        </>
    );
}

export default MatchResultEdit; 