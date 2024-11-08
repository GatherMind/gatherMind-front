

import profileicon from "../assets/profileicon.png"
import groupicon from "../assets/groupicon.png"
import appointmenticon from "../assets/appointmenticon.png"
import { useNavigate } from "react-router-dom";


export default function Footer() {

  const navigate = useNavigate();

  function handleclick(){

    navigate('/main/profile')
    
  }

return (


  <div className="footer">
<div className="footer-item">  

<img src={profileicon} onClick={handleclick}/> </div>
<div className="footer-item">   <img src={groupicon}/>  </div>
<div className="footer-item">  <img src={appointmenticon}/> </div>
</div>
) 


}




