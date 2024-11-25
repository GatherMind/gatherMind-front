import React, { useEffect, useState } from "react";

const QuestionForm = ({ onSubmit, question }) => {
  const [option, setOption] = useState("질문");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(question);

    if (question) {
      // 수정모드일 경우
      setOption(question.option);
      setTitle(question.title);
      setContent(question.content);
    }
  }, [question]);

  // 데이터 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("option", option);
    formData.append("content", content);

    // 파일이 선택된 경우에만 추가
    if (file) {
      formData.append("file", file); // file 자체를 추가
    }

    // onSubmit({ title, option, content });
    onSubmit(formData);
  };

  const handleSelect = (e) => {
    setOption(e.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="option">말머리</label>
        <select
          name="option"
          id="option"
          value={option}
          onChange={handleSelect}
        >
          <option value="질문">질문하기</option>
          <option value="자료공유">자료공유</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="question_title">게시글 제목 </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="file_select">파일 선택</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="form-group">
        <label htmlFor="description">게시글 내용</label>
        <textarea
          value={content}
          rows={18}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit">{question ? "수정" : "저장"}</button>
    </form>
  );
};

export default QuestionForm;
