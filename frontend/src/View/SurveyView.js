import React, { useState } from 'react';
import Question from '../Components/Question';

const SurveyView = () => {
    const [id, setid] = useState(0);

    const [questions, setquestions] = useState([
        {
            text : 'Votre email ?',
            yardstick : 'email',
            type: 'B'
        }
    ]);

    const [reponse, setreponse] = useState({
        email : ''
    });



    return (
        <div className="container mx-auto p-5 mt-14 flex justify-center
         items-center flex-col">
            <Question  id={id + 1} text={questions[id].text} yardstick={questions[id].yardstick} type={questions[id].type}/>
        </div>
       
        
    );
}

export default SurveyView;
