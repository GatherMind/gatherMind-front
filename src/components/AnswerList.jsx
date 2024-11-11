import React from "react";

const AnswerList = (props) => {

    const {answers} = props;

    return (
        <div>
            {answers && answers.map((answer) => {
                return (
                    <div className="answer-list" key={answer.answerId}>
                        {answer.content}
                    </div>
                );
            })}
        </div>
    );
};

export default AnswerList;