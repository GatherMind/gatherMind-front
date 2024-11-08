
import homeicon from "../assets/homeicon.png"
import settingicon from "../assets/settingicon.png"
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

export default function Header() {

  const navigate = useNavigate();



  function handleclick(){

    navigate('/')
    
  }

  return(

    <header className="header">
    <div className="header"> <img src={homeicon} onClick={handleclick}/></div>
    <div> <img src={settingicon}onClick={handleclick}/>MyPage</div>
    <button className="header-login">로그인</button>
   
</header>
  
  ) 

  
} 