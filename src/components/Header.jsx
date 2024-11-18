
import gathermind from "../assets/gathermind.png"
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

      <div className="header">

    <div className="header-icon"> <img src={gathermind} onClick={handleclick} width={100}/></div>

 
    <div className="header-mypage"> <img src={settingicon}onClick={handleclick}/></div>

    <button className="header-login" onClick={handleLoginClick}>로그인</button>
   
      </div>
  
  ) 

  
} 