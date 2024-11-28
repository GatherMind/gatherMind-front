import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import "../styles/global/Button.css"
import useQuillImageReplacement from "../hooks/useQuillImageReplacement";

const QuestionForm = ({onSubmit, question}) => {

    const [option, setOption] = useState("질문");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { replaceImages, endContent } = useQuillImageReplacement();

    useEffect(() => {
        console.log(question);
    
        if (question) { // 수정모드일 경우
            setOption(question.option);
            setTitle(question.title);
            setContent(question.content);
        }
    }, [question]);

    // 데이터 전송
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const updatedContent = await replaceImages(content); // 이미지 업로드 후 url 변경
        onSubmit({title, option, content: updatedContent});
    };

    const handleSelect = (e) => {
        setOption(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <select name="option" id="option" value={option} onChange={handleSelect}>
                <option value="질문">질문하기</option>
                <option value="자료공유">자료공유</option>
            </select>
            <input type="text" value={title} 
                onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" required />
            {/* <textarea value={content} rows={18}
                onChange={(e) => setContent(e.target.value)} required /> */}
            <Editor editorValue={content} onChangeEditorValue={setContent} />
            <button className="button" type="submit">{question ? "수정" : "저장"}</button>
        </form>
    );
};

export default QuestionForm;