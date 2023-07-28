import React, { useEffect, useRef, useState } from 'react';
import Question from '../Components/Question';
import { Link, useLoaderData, useParams } from "react-router-dom"
import { Validate } from '../Utils/Validate';
import { AnimatePresence, motion } from 'framer-motion';
import Error from '../Components/Error';
import { addAnswer, isSurveyCompleted } from '../Services/Route';
import LoaderView from './LoaderView';


// Ce composant représente une vue de sondage où les utilisateurs peuvent répondre à des questions. 
// Il utilise le composant Question pour afficher chaque question, le composant Error pour afficher les messages d'erreur, 
// et le composant LoaderView pour afficher un écran de chargement lorsque les données sont en cours de traitement.

const SurveyView = () => {
    // current est l'index de la question en cours
    const [current, setCurrent] = useState(0);
    // données de réponse
    const [data, setData] = useState({})
    const [email, setEmail] = useState('')
    const [[error, errorMessage], setError] = useState([false, '']);
    const [loading, setLoading] = useState(false)
    // id du sondage passé en paramètre
    const survey = useParams()
    //resultat du sondage
    const [[result, answerLink], setResult] = useState(['Bienvenue au sondage', ''])
    //question du sondage
    const questions = useLoaderData();


    useEffect(() => {
        // prévenir l'utilisateur que ses données ne seront pas enregistrer si il quitte prématurément le sondage
        function comfirmBeforeQuit(event) {
            event.preventDefault();
            event.returnValue = '';
        }

        window.addEventListener('beforeunload', comfirmBeforeQuit);

        return () => {
            window.removeEventListener('beforeunload', comfirmBeforeQuit);
        };
    }, []);

    useEffect(() => {
        // retirer la notification d'erreur après 3 secondes
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
            // ajouter la réponse dans l'objet data
            setData({ ...data, [questions[current].id]: out, })
            // incrémenter l'index de la question
            setCurrent(current + 1)
        } else {
            // si il n'ya plus de question soumettre les réponses
            submit(out)
        }
    }

    const PreviousQuestion = () => {
        // aller a la question précédente
        if (current > 0) {
            setCurrent(current - 1)
        }

    }

    // soumettre les réponses
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
            <div className="container mx-auto md:p-5 md:mt-14 flex justify-center items-center flex-col h-screen relative">
                <AnimatePresence >
                    {
                        error && (
                            <Error message={errorMessage} />
                        )
                    }
                </AnimatePresence>
                <div className={result ? "alert w-11/12 md:w-1/2 " : 'hidden'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className='text-lg text-center w-full'>
                        {result}
                        <br/>
                        {!answerLink ? <button className='btn mx-auto my-3 text-black bg-white hover:scale-95 hover:text-white' onClick={() => {setResult(['',''])} }>Démarrer</button> : null}
                        <Link to={'../' + answerLink} className={!answerLink ? 'hidden' : "link link-info" }>mes reponses</Link>
                    </span>
                </div>

                {
                    !result
                    &&
                    <>
                        <AnimatePresence mode='wait'>
                            <Question index={current + 1} key={current + 1} question={questions[current]} next={NextQuestion} previous={PreviousQuestion} value={data[questions[current].id]} />
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
