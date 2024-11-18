
import icon from "../assets/profileicon.png"
import { useNavigate } from "react-router-dom";
import UseMemberApi from "../server/UseMemberApi";

export default function Profile({loginData}) {

  const navigate = useNavigate();






  function handleclick(){

    navigate('/main/profile')
    
  }




  return(

    <div className="profile">   
    <div className="profilename"> 
      
        <img src={icon} onClick={handleclick}/> 반가워요 {loginData.memberId}님!
      
      </div>  
    
      </div>
    
   
  ) 

  
} 