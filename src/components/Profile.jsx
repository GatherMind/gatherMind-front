import icon from "../assets/profileicon.png";
import { useNavigate } from "react-router-dom";
import UseMemberApi from "../server/UseMemberApi";

export default function Profile() {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/main/profile");
  }

  const { data, loading, error } = UseMemberApi();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile">
      <div className="profilename">
        <img src={icon} onClick={handleclick} /> 반가워요
        {data.nickname}
      </div>
    </div>
  );
}
