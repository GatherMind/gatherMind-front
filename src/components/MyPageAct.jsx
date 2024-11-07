import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const MypageAct = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentAnswers, setRecentAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const groupResponse = await axios.get("/api/members/joined-groups");
        const postsResponse = await axios.get("/api/members/recent-posts");
        const answersResponse = await axios.get("/api/members/recent-answers");

        setJoinedGroups(groupResponse.data);
        setRecentPosts(postsResponse.data.slice(0, 3));
        setRecentAnswers(answersResponse.data.slice(0, 3));
      } catch (error) {
        console.error("활동 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchActivityData();
  }, []);

  const handleWithdrawFromStudy = async (studyId) => {
    try {
      await axios.post(`/api/studies/${studyId}/withdraw`);
      setJoinedGroups(joinedGroups.filter((group) => group.id !== studyId));
      alert("스터디 탈퇴가 완료되었습니다.");
    } catch (error) {
      alert("스터디 탈퇴에 실패했습니다.");
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/posts/${postId}`);
        setRecentPosts(recentPosts.filter((post) => post.id !== postId));
        alert("게시글이 삭제되었습니다.");
      } catch (error) {
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="mypage-container">
      <header>
        <Header />
        <ol>
          <li onClick={() => navigate("/mypage")}>정보 보기</li>
          <li onClick={() => navigate("/mypage/act")}>활동 보기</li>
        </ol>
      </header>
      <h2>활동 정보</h2>

      <h3>스터디</h3>
      {joinedGroups.length > 0 ? (
        joinedGroups.map((group) => (
          <div key={group.id}>
            <p>
              {group.name}{" "}
              <button onClick={() => handleWithdrawFromStudy(group.id)}>
                탈퇴
              </button>
            </p>
          </div>
        ))
      ) : (
        <p>스터디에 가입하세요!</p>
      )}

      <h3>작성한 게시글 현황</h3>
      {joinedGroups.length === 0 ? (
        <p>스터디에 가입하세요!</p>
      ) : recentPosts.length > 0 ? (
        recentPosts.map((post) => (
          <div key={post.id}>
            <p>
              {post.studyName} - {post.title}{" "}
              <button onClick={() => handleEditPost(post.id)}>수정</button>{" "}
              <button onClick={() => handleDeletePost(post.id)}>삭제</button>
            </p>
          </div>
        ))
      ) : (
        <p>스터디에 글을 남겨 정보를 공유하세요</p>
      )}

      <h3>작성한 답변 현황</h3>
      {joinedGroups.length === 0 ? (
        <p>스터디에 가입하세요!</p>
      ) : recentAnswers.length > 0 ? (
        recentAnswers.map((answer) => (
          <div key={answer.id}>
            <p>
              {answer.studyName} - {answer.postTitle}{" "}
              <button onClick={() => handleEditPost(answer.postId)}>
                수정
              </button>{" "}
              <button onClick={() => handleDeletePost(answer.postId)}>
                삭제
              </button>
            </p>
          </div>
        ))
      ) : (
        <p>게시글에 답변을 남겨 정보를 공유하세요</p>
      )}
    </div>
  );
}

export default MypageAct;
