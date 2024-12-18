import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import "../styles/global/FormContainer.css";
import { CATEGORY_ALL, STUDY_STATE } from "../constants/constants";
import { getStudyCategory } from "../services/StudyCategoryApiService";

const StudyForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studyCategories, setStudyCategories] = useState([]);

  const [status, setStatus] = useState(
    initialData?.studyHeader || STUDY_STATE.OPEN
  );

  const [category, setCategory] = useState(CATEGORY_ALL);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status || STUDY_STATE.OPEN);
    }

    const fetchCategory = async () => {
      try {
        const studyCategory = await getStudyCategory();
        setStudyCategories(studyCategory);
      } catch (error) {
        console.error("카테고리 조회 error :", error);
      }
    };
    fetchCategory();
  }, [initialData]);

  const validateForm = () => {
    let errorMessage = "";
    if (title.length < 3)
      errorMessage = "스터디 이름은 최소 3자 이상이어야 합니다.";
    else if (description.length < 10)
      errorMessage = "스터디 소개는 최소 10자 이상이어야 합니다.";

    setError(errorMessage);
    return errorMessage === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    onSubmit({ title, description, status, category });
    setIsSubmitting(false);
  };
  const buttonLabel = isSubmitting
    ? "처리 중..."
    : initialData
    ? "스터디 수정"
    : "스터디 생성";

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="status">모집상태</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="OPEN">모집중</option>
          <option value="CLOSED">모집 완료</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="status">카테고리</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {studyCategories.map((category) => (
            <option key={category.code} value={category.code}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="studyTitle">스터디 이름</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="스터디 이름"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">스터디 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="스터디 소개"
          required
        />
        {/* <Editor
          editorValue={description}
          onChangeEditorValue={setDescription}
        /> */}
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isSubmitting} className="submit-button">
        {buttonLabel}
      </button>
    </form>
  );
};

export default StudyForm;
