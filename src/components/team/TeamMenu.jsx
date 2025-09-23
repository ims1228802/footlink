import '../../css/team/TeamMenu.css'
import search from '../../assets/team/search.png'
import { useState } from 'react'

export default function TeamMenu() {
    const [ menu, setMenu ] = useState('teamList');

    function selectHandeler(selectMenu){
      setMenu(selectMenu);
    }

    return (
      <div className="team_menu">
        <ul>
            <li className={menu == 'teamList' ? 'active' : undefined} onClick={() => selectHandeler('teamList')}>팀 목록</li>
            <li className={menu == 'teamRecruit' ? 'active' : undefined} onClick={() => selectHandeler('teamRecruit')}>팀원 모집</li>
        </ul>
        <div className='team_search'>
            <img src={search} alt="" />
            <input id="team_search" name="team_search" type="text" placeholder="팀 이름을 입력해주세요" />
        </div>
      </div> 
    );
}