
import homeicon from "../assets/homeicon.png"
import settingicon from "../assets/settingicon.png"
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

export default function Header({setLoginresult}) {

  const navigate = useNavigate();



  function handleclick(){

    navigate('/')
    
  }

  function handleLoginClick() {

    navigate('/login')
  }

  return(

    <header className="header">
    <div className="header"> <img src={homeicon} onClick={handleclick}/></div>
    <div> <img src={settingicon}onClick={handleclick}/>MyPage</div>
    <button className="header-login" onClick={handleLoginClick}>로그인</button>
   
</header>
  
  ) 

  
} 