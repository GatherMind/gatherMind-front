import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Editor.css";
import { ImageResize } from "quill-image-resize-module-ts";

if (typeof window !== 'undefined' && window.Quill) {
    window.Quill = Quill;
}
Quill.register("modules/ImageResize", ImageResize);

const Editor = ({ editorValue, onChangeEditorValue }) => {

    const formats = [
        'font',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'align',
        'color',
        'background',
        'size',
        'image'
    ];

  const modules = useMemo(() => ({
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
      modules: ['Resize', 'DisplaySize'],
      parchment: Quill.import('parchment'),
    } 
  }), []);

    return (
        <ReactQuill 
        theme="snow"
        modules={modules}
        formats={formats}
        value={editorValue}
        onChange={onChangeEditorValue}/>
    );
};

export default Editor;