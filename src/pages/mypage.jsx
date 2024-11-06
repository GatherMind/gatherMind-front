import React from "react";
import "../styles/mypage.css";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();

  const toModify = () => {
    navigate("/modify");
  };
  return (
    <>
      <div className="mypageWrap">
        <header>
          <h1 onClick={() => navigate("/")}>My Page</h1>
        </header>
        <main>
          <div className="mypageUserInfo">
            <h2>아이디</h2>
            <p>아이디</p>
            <h2>닉네임</h2>
            <p>닉네임</p>
            <h2>전화번호</h2>
            <p>전화번호</p>
          </div>
        </main>
        <footer>
          <div>
            <button className="modifyBtn" onClick={toModify}>
              정보 수정
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Mypage;
