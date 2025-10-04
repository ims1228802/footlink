import '../../css/team/TeamMenu.css'
import search from '../../assets/team/search.png'
import { useState } from 'react'
import axios from 'axios';

export default function TeamMenu(list) {
    const [ menu, setMenu ] = useState('teamList');
    const [ searchText, setSearchText ] = useState('');

    function selectHandeler(selectMenu){
      setMenu(selectMenu);
    }

    const inputHandler = (e) => {
      setSearchText(e.target.value);
      console.log(list);
      console.log(searchText);
      const filterList = list.filter(item => item.teamName.toLowerCase().include(search.toLowerCase()));

      console.log(filterList);
      console.log('success!');
    }

    return (
      <div className="team_menu">
        <ul>
            <li className={menu == 'teamList' ? 'active' : undefined} onClick={() => selectHandeler('teamList')}>팀 목록</li>
            <li className={menu == 'teamRecruit' ? 'active' : undefined} onClick={() => selectHandeler('teamRecruit')}>팀원 모집</li>
        </ul>
        <div className='team_search'>
            <img src={search} alt="" />
            <input onInput={inputHandler} id="team_search" name="team_search" type="text" placeholder="팀 이름을 입력해주세요" value={searchText}/>
        </div>
      </div> 
    );
}