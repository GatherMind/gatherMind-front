import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Editor.css";
import { ImageResize } from "quill-image-resize-module-ts";
import { ImageDrop } from "quill-image-drop-module";

if (typeof window !== "undefined" && window.Quill) {
  window.Quill = Quill;
}

Quill.register("modules/ImageResize", ImageResize);
Quill.register("modules/ImageDrop", ImageDrop);

const Editor = ({ editorValue, onChangeEditorValue }) => {
  // <p className="question-content"
  //   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(question?.content))}} />
  //   이런식으로 sanitize() 함수 안에 출력 데이터 넣고 styles/global/ReactQuill.css 만 적용

  const formats = [
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "color",
    "background",
    "size",
    "image",
  ];

  const modules = useMemo(
    () => ({
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
      ImageResize: {
        modules: ["Resize", "DisplaySize"],
      },
      ImageDrop: true,
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={editorValue || ""} // 기본값 설정
      onChange={onChangeEditorValue}
    />
  );
};

export default Editor;
