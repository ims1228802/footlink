import { useSelector } from 'react-redux';
import '../../css/team/TeamSubMenu.css'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function TeamSubMenu({selectMenu}) {
    const navigate = useNavigate();
    const { data: user, isLoading } = useUser();

    const navigateHandler = () => {
        console.log(user);

        if(user){
            if(selectMenu == 'teamList'){
                navigate('/newTeam');
            } else {
                navigate('/newTeamRecruit');
            }
        }else{
            alert('로그인 후 이용가능합니다');
            navigate('/login');
        }

    }

    //console.log(menu.selectMenu);
    return(
        <div className='team_sub_menu'>
            <div className='team_filter'>
                <label htmlFor='area' className='w-32 outline-1 outline-cyan-500 rounded-full px-3 py-1 mr-3 text-cyan-500 has-checked:bg-cyan-500 has-checked:text-white hover:bg-cyan-500 hover:text-white cursor-pointer'>
                    <span>지역</span>
                    <input type='checkbox' id='area' name='area' className='appearance-none'/>
                </label>
                <label htmlFor='gender' className='w-32 outline-1 outline-cyan-500 rounded-full px-3 py-1 mr-3 text-cyan-500 has-checked:bg-cyan-500 has-checked:text-white hover:bg-cyan-500 hover:text-white cursor-pointer'>
                    <span>성별</span>
                    <input type='checkbox' id='gender' name='gender' className='appearance-none'/>
                </label>
                <label htmlFor='level' className='w-32 outline-1 outline-cyan-500 rounded-full px-3 py-1 mr-3 text-cyan-500 has-checked:bg-cyan-500 has-checked:text-white hover:bg-cyan-500 hover:text-white cursor-pointer'>
                    <span>레벨</span>
                    <input type='checkbox' id='level' name='level' className='appearance-none'/>
                </label>
                <label htmlFor='age' className='w-32 outline-1 outline-cyan-500 rounded-full px-3 py-1 mr-3 text-cyan-500 has-checked:bg-cyan-500 has-checked:text-white hover:bg-cyan-500 hover:text-white cursor-pointer'>
                    <span>나이</span>
                    <input type='checkbox' id='age' name='age' className='appearance-none'/>
                </label>
                <label htmlFor='week' className='w-32 outline-1 outline-cyan-500 rounded-full px-3 py-1 mr-3 text-cyan-500 has-checked:bg-cyan-500 has-checked:text-white hover:bg-cyan-500 hover:text-white cursor-pointer'>
                    <span>요일</span>
                    <input type='checkbox' id='week' name='week' className='appearance-none'/>
                </label>
                <label htmlFor='time' className='w-32 outline-1 outline-cyan-500 rounded-full px-3 py-1 mr-3 text-cyan-500 has-checked:bg-cyan-500 has-checked:text-white hover:bg-cyan-500 hover:text-white cursor-pointer'>
                    <span>시간대</span>
                    <input type='checkbox' id='time' name='time' className='appearance-none'/>
                </label>
            </div>
            <button className='outline-1 outline-cyan-500 text-cyan-500' onClick={navigateHandler}>{selectMenu == 'teamList' ? '팀 생성하기' : '팀원 모집하기'}</button>
        </div>
    );
}