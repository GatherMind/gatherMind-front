import React, { useRef } from "react";
import Answer from "./Answer";

const AnswerList = ({answers, fetch}) => {

    const answerRefs = useRef([]);

    return (
        <div>
            <p className="answer-count">댓글 {answers?.length || 0}</p>
            {answers && answers.map((answer, index) => (
                <div className="answer-list" key={answer.answerId} ref={(el) => (answerRefs.current[index] = el)}>
                    <Answer answer={answer} fetch={fetch} scrollToRef={() => answerRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />
                </div>
            ))}
        </div>
    );
};

export default AnswerList;