import React, { useEffect, useRef, useState } from "react";
import Answer from "./Answer";
import { getAnswers } from "../services/QuestionApiService";
import {
  createAnswer,
  deleteAnswer,
  updateAnswer,
} from "../services/AnswerApiService";
import { useAuth } from "../context/AuthContext";

const AnswerList = ({ questionId, memberId }) => {
  const answerRefs = useRef([]);
  const scrollUpRef = useRef();

  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);

  const [isLastPage, setIsLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { authToken } = useAuth();

  useEffect(() => {
    loadMoreAnswers(questionId);
  }, [questionId]);

  const loadMoreAnswers = async (id) => {
    try {
      const answerData = await getAnswers(id, currentPage);

      console.log("댓글 조회 성공 ", answerData);

      setCount(answerData.totalElements);

      // 더보기
      setAnswers((prevAnswers) => {
        const allAnswers = [...prevAnswers, ...answerData.content];
        return Array.from(
          new Map(
            allAnswers.map((answer) => [answer.answerId, answer])
          ).values()
        );
      });
      setCurrentPage(currentPage + 1);

      setIsLastPage(answerData.last); // 마지막 페이지 여부 확인
    } catch (error) {
      console.log("댓글을 불러오는데 실패했습니다.", error);
    }
  };

  const onSubmit = async () => {
    if (answer === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const response = await createAnswer(
        {
          content: answer,
          questionId: questionId,
        },
        authToken
      );
      console.log("댓글 작성 성공");

      setAnswer(""); // 댓글 작성 후 입력창 초기화
      addNewAnswer(response);
      scrollUpRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log("댓글 작성 실패", error);
    }
  };

  const addNewAnswer = (newAnswer) => {
    console.log(newAnswer);
    setAnswers((prevAnswers) => [newAnswer, ...prevAnswers]);
    setCount(count + 1);
  };

  const isLogin = () => {
    if (memberId === "") {
      alert("댓글을 작성하려면 로그인 해주세요.");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await deleteAnswer(answerId);
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.answerId !== answerId)
      );
      setCount((prevCount) => prevCount - 1);
      console.log("댓글 삭제 성공");
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  const handleUpdateAnswer = async (answerId, editedContent) => {
    try {
      const updatedAnswer = await updateAnswer(answerId, editedContent);
      console.log("수정내용", updatedAnswer.content);
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.answerId === answerId
            ? { ...answer, content: updatedAnswer.content }
            : answer
        )
      );
      console.log("댓글 수정 성공");
    } catch (error) {
      console.error("댓글 수정 실패", error);
    }
  };

  return (
    <div>
      <p className="answer-count" ref={scrollUpRef}>
        댓글 {count}
      </p>
      {answers &&
        answers.map((answer, index) => (
          <div
            className="answer-list"
            key={answer.answerId}
            ref={(el) => (answerRefs.current[index] = el)}
          >
            <Answer
              memberId={memberId}
              answer={answer}
              onDelete={handleDeleteAnswer}
              onUpdate={handleUpdateAnswer}
              scrollToRef={() =>
                answerRefs.current[index]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
            />
          </div>
        ))}
      {!isLastPage && (
        <div
          className="answer-list more-answer"
          onClick={() => loadMoreAnswers(questionId)}
        >
          더보기 ...
        </div>
      )}
      <div className="answer-input-section">
        <textarea
          placeholder="댓글을 남겨보세요"
          className="answer-input"
          value={answer}
          onClick={isLogin}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {memberId !== "" ? (
          <button onClick={onSubmit} className="submit-button">
            등록
          </button>
        ) : (
          <button className="submit-button disabled">등록</button>
        )}
      </div>
    </div>
  );
};

export default AnswerList;
