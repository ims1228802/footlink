import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

function MatchResult() {
    const { matchNo } = useParams(); 
    
    const [activeTab, setActiveTab] = useState(1); 
    
    const [playerList, setPlayerList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [isSaving, setIsSaving] = useState(false);


    const [games, setGames] = useState([
        createGame(1)
    ]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/api/Match/playerList/${matchNo}`);
                const playerData = response.data.player || [];
                setPlayerList(playerData); 
                const teams = new Map();
                playerData.forEach(player => {
                    if (player.teamCode && player.teamName) {
                        const codes = String(player.teamCode).split(', ');
                        const names = String(player.teamName).split(', ');
                        codes.forEach((code, index) => {
                            if (!teams.has(code)) {
                                teams.set(code, names[index]);
                            }
                        });
                    }
                });
                const uniqueTeamList = Array.from(teams, ([code, name]) => ({
                    teamCode: code,
                    teamName: name 
                }));
                
                setTeamList(uniqueTeamList);
                
                console.log("전체 선수 데이터:", playerData); 
                console.log("고유 팀 목록:", uniqueTeamList);

            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
                setPlayerList([]);
                setTeamList([]);
            }
        };
        fetchData();
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


   const handleSaveResult = async () => {
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

        console.log("서버로 전송할 최종 데이터:", resultData);

        setIsSaving(true); 
        try {
            const response = await axios.post(
                'http://localhost/api/Match/save-results', 
                resultData
            );

            if (response.status >= 200 && response.status < 300) {
                alert('결과가 성공적으로 저장되었습니다.');
                navigate('/adminMatch');
            } else {
                alert(`결과 저장에 실패했습니다. (상태 코드: ${response.status})`);
            }

        } catch (error) {

            console.error("결과 저장 중 오류 발생:", error);
            let errorMessage = '결과 저장에 실패했습니다.';
            if (error.response) {

                errorMessage += `\n서버 응답: ${error.response.data?.message || error.response.statusText || '알 수 없는 오류'}`;
            } else if (error.request) {

                errorMessage += '\n서버로부터 응답을 받지 못했습니다.';
            } else {

                errorMessage += `\n요청 설정 오류: ${error.message}`;
            }
            alert(errorMessage);
        } finally {
            setIsSaving(false); 
        }
    };

    const handleTeamChange = (team, teamId) => {
        setGames(prevGames => 
            prevGames.map(game => {
                if (game.gameNumber === activeTab) {
                    const fieldToUpdate = team === 'A' ? 'selectedTeamA' : 'selectedTeamB';
                    return {
                        ...game,
                        [fieldToUpdate]: teamId
                    };
                }
                return game;
            })
        );
    };

    const handleStatChange = (team, index, field, value) => {
        setGames(prevGames => 
            prevGames.map(game => {
                if (game.gameNumber === activeTab) {
                    const statsField = team === 'A' ? 'teamAStats' : 'teamBStats';
                    
                    const newStats = game[statsField].map((stat, i) => {
                        if (i === index) {
                            return { ...stat, [field]: value };
                        }
                        return stat;
                    });
                    
                    return {
                        ...game,
                        [statsField]: newStats
                    };
                }

                return game;
            })
        );
    };

    const currentGame = games.find(g => g.gameNumber === activeTab);

    const totalAGoal = currentGame?.teamAStats.reduce((sum, stat) => sum + (Number(stat.goal) || 0), 0) || 0;
    const totalAAssist = currentGame?.teamAStats.reduce((sum, stat) => sum + (Number(stat.assist) || 0), 0) || 0;
    const totalASave = currentGame?.teamAStats.reduce((sum, stat) => sum + (Number(stat.save) || 0), 0) || 0;

    const totalBGoal = currentGame?.teamBStats.reduce((sum, stat) => sum + (Number(stat.goal) || 0), 0) || 0;
    const totalBAssist = currentGame?.teamBStats.reduce((sum, stat) => sum + (Number(stat.assist) || 0), 0) || 0;
    const totalBSave = currentGame?.teamBStats.reduce((sum, stat) => sum + (Number(stat.save) || 0), 0) || 0;


    return (
        <>
            <Layout>
                <section className="mypage-contents">
                    <div className="content-header">
                        <h2 className="content-title" style={{ color: 'white', marginTop: '30px' }}>
                            매치 결과 입력 (매치 No: {matchNo})
                        </h2>
                    </div>
                    
                    <div className="card" style={{ borderColor: 'var(--primary-blue)', borderWidth: '2px' }}>
                        <div className="card-body">
                            
                            <ul className="result-tabs">
                                {games.map(game => (
                                    <li 
                                        key={game.gameNumber}
                                        className={`tab-item ${activeTab === game.gameNumber ? 'active' : ''}`}
                                        onClick={() => handleTabClick(game.gameNumber)}
                                    >
                                        {game.gameNumber}경기
                                    </li>
                                ))}
                                
                                <li className="tab-item add-game" onClick={handleAddGame}>
                                    + 경기 추가
                                </li>
                            </ul>

                            {/* 탭 콘텐츠 */}
                            <div className="tab-content">
                                {!currentGame ? (
                                    <div>경기를 선택해주세요.</div>
                                ) : (
                                    <div className="game-container">
                                        {/* 왼쪽 팀 테이블 */}
                                        <div className="team-table-wrapper">
                                            <select 
                                                className="form-select team-select mb-3"
                                                value={currentGame.selectedTeamA}
                                                onChange={(e) => handleTeamChange('A', e.target.value)}
                                            >
                                                <option value="">A팀 선택</option>
                                                {teamList.map((team) => (
                                                    <option key={team.teamCode} value={team.teamCode}>
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
                                                        <tr key={index}>
                                                            <td>
                                                                <select 
                                                                    className="form-select player-select"
                                                                    value={stat.playerId}
                                                                    onChange={(e) => handleStatChange('A', index, 'playerId', e.target.value)}
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
                                                                    onChange={(e) => handleStatChange('A', index, 'goal', Number(e.target.value))}
                                                                    className="form-control form-control-sm stat-input" 
                                                                />
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="number" min="0" 
                                                                    value={stat.assist}
                                                                    onChange={(e) => handleStatChange('A', index, 'assist', Number(e.target.value))}
                                                                    className="form-control form-control-sm stat-input" 
                                                                />
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="number" min="0" 
                                                                    value={stat.save}
                                                                    onChange={(e) => handleStatChange('A', index, 'save', Number(e.target.value))}
                                                                    className="form-control form-control-sm stat-input" 
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
                                            >
                                                <option value="">B팀 선택</option>
                                                {teamList.map((team) => (
                                                    <option key={team.teamCode} value={team.teamCode}>
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
                                                        <tr key={index}>
                                                            <td>
                                                                <select 
                                                                    className="form-select player-select"
                                                                    value={stat.playerId}
                                                                    onChange={(e) => handleStatChange('B', index, 'playerId', e.target.value)}
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
                                                                    onChange={(e) => handleStatChange('B', index, 'goal', Number(e.target.value))}
                                                                    className="form-control form-control-sm stat-input" 
                                                                />
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="number" min="0" 
                                                                    value={stat.assist}
                                                                    onChange={(e) => handleStatChange('B', index, 'assist', Number(e.target.value))}
                                                                    className="form-control form-control-sm stat-input" 
                                                                />
                                                            </td>
                                                            <td>
                                                                <input 
                                                                    type="number" min="0" 
                                                                    value={stat.save}
                                                                    onChange={(e) => handleStatChange('B', index, 'save', Number(e.target.value))}
                                                                    className="form-control form-control-sm stat-input" 
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

                            <div className="save-button-container">
                                <button className="btn btn-save-result" onClick={handleSaveResult}>
                                    결과 저장
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default MatchResult;