
import icon from "../assets/profileicon.png"
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();



  function handleclick(){

    navigate('/main/profile')
    
  }

  return(

    <div className="profile">   
    <div className="profilename"> 
      
        <img src={icon} onClick={handleclick}/> Profile
      
      </div>  
    
      </div>
    
   
  ) 

  
} 