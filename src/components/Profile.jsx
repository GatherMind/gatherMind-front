import icon from "../assets/defaultProfile.png";
import { useNavigate } from "react-router-dom";

export default function Profile({ loginData }) {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/mypage");
  }

  return (
    <div className="profile">
      <div className="profilename">
        <img
          alt=""
          src={icon}
          onClick={handleclick}
          style={{ width: "48px" }}
        />{" "}
        반가워요 {loginData.nickname}
        님!
      </div>
    </div>
  );
}
