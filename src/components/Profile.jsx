import icon from "../assets/profileicon.png";
import { useNavigate } from "react-router-dom";

export default function Profile({ loginData }) {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/mypage");
  }

  return (
    <div className="profile">
      <div className="profilename">
        <img alt="" src={icon} onClick={handleclick} /> 반가워요{" "}
        {loginData.nickname}
        님!
      </div>
    </div>
  );
}
