import logo from "C:/develop/React class/study/vite-project/src/assets/FootLink.svg";
import icon from "C:/develop/React class/study/vite-project/src/assets/Searchicon.svg";
import user from "C:/develop/React class/study/vite-project/src/assets/User.svg";
import match from "C:/develop/React class/study/vite-project/src/assets/Calendar.svg";
import team from "C:/develop/React class/study/vite-project/src/assets/Shield.svg";
import "./Header.css";

export default function Header () {
  return(
    <>
    <header>
      <img src = { logo } style={{ width: '100px'}}/>
      <div class = "search-bar" 
      style={
        {display: 'flex',background: 'white',
         border : '1px solid black', borderRadius : '25px', width : '237px', 
         marginLeft : '480px'}}>
        <img src = { icon } style={{ width :'24px', margin : '5px'}} />
        <input class = "search-input" type="text"
        style={{ outline: 'none', border: 'none' }}
        placeholder="지역, 구장, 팀이름으로 찾기 "></input>
      </div>
      <div class="menu-arr">
        <a href="#">
            <img class="page-menu" src= { team }/>
        </a>
        <a href="#">
            <img class="page-menu" src= { match }/>
        </a>
        <a href="#">
            <img class="page-menu" src= { user }/>
        </a>
      </div>
    </header>
    <hr/>
    </>
  );
}