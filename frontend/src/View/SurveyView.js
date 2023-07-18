import React, { useEffect, useRef, useState } from 'react';
import Question from '../Components/Question';
import { Link, useLoaderData, useParams } from "react-router-dom"
import { Validate } from '../Utils/Validate';
import { AnimatePresence, motion } from 'framer-motion';
import Error from '../Components/Error';
import { addAnswer, isSurveyCompleted } from '../Services/Route';
import LoaderView from './LoaderView';

const SurveyView = () => {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({})
    const [email, setEmail] = useState('')
    const [[error, errorMessage], setError] = useState([false, '']);
    const [loading, setLoading] = useState(false)
    const survey = useParams()
    const [isSurveyOver, setSurveyOver] = useState(false)
    const [[result, answerLink], setResult] = useState(['', ''])

    const questions = useLoaderData();


    useEffect(() => {

        function confirmerAvantDeQuitter(event) {
            event.preventDefault();
            event.returnValue = '';
        }

        window.addEventListener('beforeunload', confirmerAvantDeQuitter);

        return () => {
            window.removeEventListener('beforeunload', confirmerAvantDeQuitter);
        };
    }, []);

    useEffect(() => {
        if (error) {
            setTimeout(() => { setError([false, '']) }, 3000);
        }
    }, [error]);



    const NextQuestion = async (out) => {
        // valider les données
        let ValidationData = Validate(out, questions[current].validateAs)

        if (ValidationData.error) {
            setError([ValidationData.error, ValidationData.message])
            return
        }


        if (current < questions.length - 1) {
            if (current == 0) {
                setEmail(out)
                // si il s'agit de la première question (le mail) , verifier que l'utilisateur n'a pas déja répondu
                setLoading(true)
                let res = await isSurveyCompleted.getResponse({ id: survey.id }, { email : out })
                if (  res.data.hasCompleted) {
                    setResult([res.message, res.data.link])
                    setLoading(false)
                    return
                }
                setLoading(false)

            }
            setData({ ...data, [questions[current].id]: out, })
            setCurrent(current + 1)
        } else {
            submit(out)
        }
    }

    const PreviousQuestion = () => {
        if (current > 0) {
            setCurrent(current - 1)
        }

    }

    const submit = async (lastAnswer) => {
        setLoading(true)
        let res = await addAnswer.getResponse({}, {
            "email": email,
            "data": { ...data, [questions[current].id]: lastAnswer },
            "survey_id": survey.id
        })
        setResult([res.message, res.data.link])
        setLoading(false)
    }

    

    return (
        loading ? <LoaderView /> :
            <div className="container mx-auto p-5 mt-14 flex justify-center items-center flex-col h-screen relative">
                <AnimatePresence >
                    {
                        error && (
                            <Error message={errorMessage} />
                        )
                    }
                </AnimatePresence>
                <div className={result ? "alert  w-1/2" : 'hidden'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className='text-lg'>
                        {result}
                        <Link to={'../' + answerLink} className="link link-info">mes reponses</Link>
                    </span>
                </div>

                {
                    !result
                    &&
                    <>
                        <AnimatePresence mode='wait'>
                            <Question key={current + 1} question={questions[current]} next={NextQuestion} previous={PreviousQuestion} value={data[questions[current].id]} />
                        </AnimatePresence>
                        <div
                            className=" w-1/2 absolute bottom-20 h-2 rounded bg-base-200 overflow-hidden"
                        >
                            <motion.div
                                className='bg-white h-full '
                                animate={{
                                    width: (current / questions.length * 100) + "%"
                                }}
                            ></motion.div>
                        </div><div className="join absolute bottom-20 right-2">
                            <button className="btn join-item" onClick={PreviousQuestion}><i className="bi bi-chevron-left"></i></button>

                            <button className="btn join-item"
                                onClick={() => {
                                    if (questions[current].type == 'B' && questions[current].validateAs != 'textarea') {
                                        NextQuestion(document.getElementsByTagName('input')[0].value);
                                    } else {
                                        NextQuestion(data[questions[current].id]);
                                    }
                                }}

                                disabled={!Boolean(data[questions[current].id])}
                            ><i className="bi bi-chevron-right"></i></button>
                        </div>
                    </>
                }
            </div>
    );
}

export default SurveyView;
