import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../css/team/TeamList.css";
import TeamMenu from '../../components/team/TeamMenu';
import TeamSubMenu from '../../components/team/TeamSubMenu';
import teamImg from '../../assets/team/team_logo.png'
import userIcon from '../../assets/team/user_white.png'
import viewIcon from '../../assets/team/view.png'
import favoriteIcon from '../../assets/team/favorite.png'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function TeamList() {
    const [selectButton, setSelectButton] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/api/team')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(`Error feching data: ${error}`);
        })
    },[]);

    const selectHandeler = (selectButton) => {
        setSelectButton(selectButton);
    }

    return(
        <>
        <Header />
        <main>
            <TeamMenu />
            <TeamSubMenu />
            {data.map((list) => list.isTemp == "정석" ? (
            <div className='team_div'>
                <div className='team_img'>
                    <img src={teamImg} />
                </div>
                <div className='team_info'>
                    <div className='team_name'>
                        <p>{list.teamName}</p>
                        <div className='user_count'>
                            <img src={userIcon} />
                            <span>15</span>
                        </div>
                    </div>
                    <div className='team_area'>
                        <span>{list.regionName}</span>
                        <span>전주 두잇 풋살장</span>
                    </div>
                    <div className='team_details'>
                        <span>남녀모두</span>
                        <span>20대</span>
                        <span>매일 점심</span>
                        <span>비기너 1</span>
                    </div>
                </div>
                <div className='team_view_favorite'>
                    <div className='team_view'>
                        <img src={viewIcon} />
                        <span>35</span>
                    </div>
                    <div className='team_favorite'>
                        <img src={favoriteIcon}></img>
                        <span>50</span>
                    </div>
                </div>
            </div>
            ):'')}
        </main>
        <Footer />
        </>
    )
}