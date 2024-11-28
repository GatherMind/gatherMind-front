import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Editor.css";

const Editor = ({ editorValue, onChangeEditorValue }) => {
  // <p className="question-content"
  //   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(question?.content))}} />
  //   이런식으로 sanitize() 함수 안에 출력 데이터 넣고 styles/global/ReactQuill.css 만 적용

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "color",
    "background",
    "size",
    "h1",
  ];

  const modules = {
    toolbar: {
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image"],
      ],
    },
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={editorValue}
      onChange={onChangeEditorValue}
    />
  );
};

export default Editor;
