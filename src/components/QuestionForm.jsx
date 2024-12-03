import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import "../styles/global/Button.css";
import useQuillImageReplacement from "../hooks/useQuillImageReplacement";

const QuestionForm = ({ onSubmit, question }) => {
  const options = [
    { value: "QUESTION", label: "질문하기" },
    { value: "FILE_SHARED", label: "파일공유" },
  ]; // Enum 값과 일치

  const [option, setOption] = useState(options[0].value);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [beforeFileName, setBeforeFileName] = useState("");

  const { replaceImages, endContent } = useQuillImageReplacement();

  useEffect(() => {
    if (question) {
      // 수정모드일 경우
      setOption(question.option);
      setTitle(question.title);
      setContent(question.content);
      setBeforeFileName(question.fileName);
      setUrl(question.url);
      setContent(question.content);
      setBeforeFileName(question.fileName);
      setUrl(question.url);
    }
  }, [question]);

  // 데이터 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("option", option);
    formData.append("content", content);

    console.log(title);
    console.log(option);
    console.log(content);

    // 파일이 선택된 경우에만 추가
    if (file) {
      formData.append("file", file); // file 자체를 추가
    }

    onSubmit(formData);

    // const updatedContent = await replaceImages(content); // 이미지 업로드 후 url 변경
    // onSubmit({title, option, content: updatedContent});
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
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
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
        <div>
          {" "}
          {beforeFileName && (
            <p>
              수정 전 파일:
              <a href={url} target="_blank" rel="noopener noreferrer">
                {beforeFileName}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">게시글 내용</label>
        {/* <textarea
          value={content}
          rows={18}
          onChange={(e) => setContent(e.target.value)}
          required
        /> */}
        <Editor editorValue={content} onChangeEditorValue={setContent} />
      </div>

      <button className="button" type="submit">
        {question ? "수정" : "저장"}
      </button>
    </form>
  );
};

export default QuestionForm;
