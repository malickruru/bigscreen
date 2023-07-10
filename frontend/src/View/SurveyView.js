import React, { useState } from 'react';
import Question from '../Components/Question';
import { useLoaderData } from "react-router-dom"

const SurveyView = () => {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({});

    const  questions = useLoaderData();

    const NextQuestion = (out) => {
        if(current < questions.length - 1 ){
            setData({...data , [questions[current].id]: out, })
            setCurrent(current + 1)
            console.log(data);
        }
    }



    return (
        <div className="container mx-auto p-5 mt-14 flex justify-center
         items-center flex-col">
            <Question key={current + 1} question={questions[current]}  next={NextQuestion}  />
                
        </div>
    );
}

export default SurveyView;
