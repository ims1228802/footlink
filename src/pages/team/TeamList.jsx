import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../css/team/TeamList.css";
import '../../css/team/TeamMenu.css'
import TeamSubMenu from '../../components/team/TeamSubMenu';
import teamImg from '../../assets/team/team_logo.png';
import userIcon from '../../assets/team/user_white.png';
import viewIcon from '../../assets/team/view.png';
import favoriteIcon from '../../assets/team/favorite.png';
import applicationIcon from '../../assets/team/group_add.png';
import search from '../../assets/team/search.png'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../layout/Layout';

export default function TeamList() {
    const [selectButton, setSelectButton] = useState();
    const [data, setData] = useState([]);
    const [ menu, setMenu ] = useState('teamList');
    const [ searchText, setSearchText ] = useState('');

    function selectMenu(selectMenu){
      setMenu(selectMenu);
    }

    useEffect(() => {
        axios.get('http://localhost/api/team')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(`Error feching data: ${error}`);
        })
    },[]);

    const filterList = data.filter((item) => item.teamName.toLowerCase().includes(searchText.toLowerCase()));

    console.log(filterList);

    const inputHandler = (e) => {
      setSearchText(e.target.value);
    }

    const selectHandeler = (selectButton) => {
        setSelectButton(selectButton);
    }

    return(
        <Layout>
        <main>
            <div className="team_menu">
                <ul>
                    <li className={menu == 'teamList' ? 'active' : undefined} onClick={() => selectMenu('teamList')}>팀 목록</li>
                    <li className={menu == 'teamRecruit' ? 'active' : undefined} onClick={() => selectMenu('teamRecruit')}>팀원 모집</li>
                </ul>
                <div className='team_search'>
                    <img src={search} alt="" />
                    <input onInput={inputHandler} id="team_search" name="team_search" type="text" placeholder="팀 이름을 입력해주세요" value={searchText}/>
                </div>
            </div>
            <div className={menu == 'teamList' ? 'team_list_div' : 'none'}>
                <TeamSubMenu selectMenu={menu}/>
                {filterList.length > 0 ? 
                    filterList.map((list) => list.isTemp == "정석" ? (
                    <div className='team_div' key={list.teamCode}>
                        <div className='team_img'>
                            <img src={teamImg} />
                        </div>
                        <div className='team_info'>
                            <div className='team_name'>
                                <p>{list.teamName}</p>
                                <div className='user_count'>
                                    <img src={userIcon} />
                                    <span>{list.userCount}</span>
                                </div>
                            </div>
                            <div className='team_area'>
                                <span>{list.regionName}</span>
                                <span>{list.stadium}</span>
                            </div>
                            <div className='team_details'>
                                <span>남녀모두</span>
                                <span>{list.teamAge}</span>
                                <span>{'매일'} {list.meetingTime}</span>
                                <span>{list.level}</span>
                            </div>
                        </div>
                        <div className='team_view_favorite'>
                            <div className='team_view'>
                                <img src={viewIcon} />
                                <span>{list.viewCount}</span>
                            </div>
                            <div className='team_favorite'>
                                <img src={favoriteIcon}></img>
                                <span>{list.favoriteCount}</span>
                            </div>
                        </div>
                    </div>
                    ) :
                    undefined) : 
                <div className='team_div'>팀 정보가 존재하지 않습니다.</div>}
            </div>
            <div className={menu == 'teamRecruit' ? 'team_recruit_div' : 'none'}>
                <TeamSubMenu selectMenu={menu}/>
                {filterList.length > 0 ? 
                    filterList.map((list) => list.isTemp == "정석" ? (
                    <div className='team_div' key={list.teamCode}>
                        <div className='team_img'>
                            <img src={teamImg} />
                        </div>
                        <div className='team_info'>
                            <div className='team_name'>
                                <p>{list.teamName}</p>
                                <div className='user_count'>
                                    <img src={userIcon} />
                                    <span>{list.userCount}</span>
                                </div>
                            </div>
                            <div className='team_area'>
                                <span>{list.regionName}</span>
                                <span>{list.stadium}</span>
                            </div>
                            <div className='team_details'>
                                <span>남녀모두</span>
                                <span>{list.teamAge}</span>
                                <span>{'매일'} {list.meetingTime}</span>
                                <span>{list.level}</span>
                            </div>
                        </div>
                        <div className='team_view_favorite'>
                            <div className='team_view'>
                                <img src={viewIcon} />
                                <span>{list.viewCount}</span>
                            </div>
                            <div className='team_application'>
                                <img src={applicationIcon} />
                                <span>15</span>
                            </div>
                            <div className='team_favorite'>
                                <img src={favoriteIcon}></img>
                                <span>{list.favoriteCount}</span>
                            </div>
                        </div>
                    </div>
                    ) :
                    undefined) : 
                <div className='team_div'>팀 정보가 존재하지 않습니다.</div>}
            </div>
        </main>
        </Layout>
    )
}