import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AnswerView = () => {
    const answers = useLoaderData()
    return (
        answers.map((answer) => {
            return <p>{answer.question} :  {answer.answer}</p>
        })
    );
}

export default AnswerView;
