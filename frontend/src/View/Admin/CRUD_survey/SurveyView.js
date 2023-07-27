import React, { useEffect, useState } from 'react';
import { FormatedDate } from '../../../Utils/Date';
import { AnimatePresence } from 'framer-motion';
import Error from '../../../Components/Error';
import { listQuestion, listSurvey, listUnreleasedQuestions } from '../../../Services/Route';
import Success from '../../../Components/Success';
import { AddSurvey, Addquestion, DeleteQuestion, DeleteSurvey, EditSurvey, Modal, ReleaseSurvey } from './Modal';

// Le composant SurveyQuestion est utilisé pour afficher les questions associées à un sondage spécifique. 
// Il prend en compte l'identifiant du sondage (id) pour récupérer les questions d'un sondage non publiées à partir du serveur .
const SurveyQuestion = ({ id,onDelete,onAdd }) => {
    const [questions, setquestion] = useState(false);

    // récupérer les questions
    const getQuestion = async () => {
        if (!questions) {
            let res = await listUnreleasedQuestions.getResponse({ id: id })
            setquestion(res.data)
        }
    }
    return (
        <div className="collapse bg-[#111827] collapse-arrow rounded-none static md:relative">
            <input type="checkbox" onChange={getQuestion} />
            <div className="collapse-title text-xl font-medium static md:relative ">
                Questions du sondage
            </div>
            <div className="collapse-content flex justify-center items-center flex-col overflow-x-auto">
                <button onClick={() => {onAdd(5,{surveyId : id})}} className='btn bg-blue-600 hover:bg-blue-700 text-white'>Ajouter +</button>
                {
                    !questions ? <span className="loading loading-spinner "></span> :
                        <table className="table  w-full text-black my-5 ml-16 md:ml-0 " >
                            <thead>
                                <tr className='bg-gray-700 text-gray-400 '>

                                    <th>N°</th>
                                    <th>Corps de la question</th>
                                    <th>Type</th>
                                    <th>Choix</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, idx) => {
                                    return <tr className='bg-gray-800 border-gray-700 text-slate-200' key={idx}>
                                        <th className=' font-medium text-slate-200'>{idx + 1}</th>
                                        <td >{question.text}</td>
                                        <td >{question.type}</td>
                                        <td >
                                            {
                                                question.type == 'A' && <ul>
                                                    {question.choices.map((choice,id) => {
                                                        return <li key={id} className=' list-disc'>{choice.text}</li>
                                                    })}
                                                </ul>
                                            }
                                        </td>
                                        <td ><i onClick={() => {onDelete(4,question)}} className="bi bi-trash text-red-600 p-2 cursor-pointer" title='Supprimer'></i>
                                        </td>
                                    </tr>;
                                })}
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

// Cette vue présente tous les sondages disponibles.
export const SurveyView = () => {

    const [surveys, setSurvey] = useState([])
    const [surveyData, setSurveyData] = useState({})
    const [loading, setLoading] = useState(false)
    const [[NotificationType, message], setNotification] = useState([false, ''])
    // determine l'index du popup ouvert , -1 signifie qu'aucun popup n'est ouvert
    const [openedModal, setOpenedModal] = useState(-1)

    useEffect(() => {
        // Récupérer les sondages
        getSurvey()
    }, []);

    // lorsqu'il ya une erreur ou un message à afficher
    useEffect(() => {
        // masquer la notification après 5 seconde
        if (NotificationType != false) {
            setTimeout(() => {
                setNotification([false, ''])
            }, 5000)
        }
    }, [NotificationType]);




    const getSurvey = async () => {
        setLoading(true)
        let res = await listSurvey.getResponse()
        setSurvey(res.data)
        setLoading(false)
    }

    // afficher une notification
    const showNotification = (type, msg) => {
        setNotification([type, msg])
    }

    // ouvrir un popup
    const openModal = (modalId,data = {}) => {
        setSurveyData(data)
        setOpenedModal(modalId)
    }

    // fermer un popup
    const closeModal = () => {
        setOpenedModal(-1)
    }

    // ensemble des popups
    const Modals = [
    <AddSurvey onClose={closeModal} onNotify={showNotification} onUpdate={getSurvey} />,
    <DeleteSurvey onClose={closeModal} onNotify={showNotification} onUpdate={getSurvey} surveyData={surveyData} />,
    <EditSurvey onClose={closeModal} onNotify={showNotification} onUpdate={getSurvey} surveyData={surveyData} />,
    <ReleaseSurvey onClose={closeModal} onNotify={showNotification} onUpdate={getSurvey} surveyData={surveyData} />,
    <DeleteQuestion onClose={closeModal} onNotify={showNotification} onUpdate={getSurvey} questionData={surveyData} />,
    <Addquestion onClose={closeModal} onNotify={showNotification} onUpdate={getSurvey} questionData={surveyData} />,

]

    if (loading) {
        return <div className='container mx-auto p-7 flex flex-col justify-center items-center relative'>
            <h1 className='text-3xl text-slate-200 text-center my-10'>Liste des sondages</h1>

            <button  className='btn  bg-blue-700 hover:bg-blue-800 text-white  my-4'>
                Ajouter un sondage +
            </button>
            <div className="card static w-10/12 bg-gray-800 border-gray-700  shadow-xl my-4 " >
                <div className="card-body animate-pulse">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-700 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card w-10/12 bg-gray-800 border-gray-700  shadow-xl my-4 " >
                <div className="card-body animate-pulse">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-700 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }


    return <div className='container mx-auto md:p-7 flex flex-col justify-center items-center md:relative'>
        {/* notification */}
        <AnimatePresence >
            {
                NotificationType == 'error' && (
                    <Error message={message} postion={['top-0', 'right-2','z-30']} AlertWidth={['w-80']} />
                )
            }
            {
                NotificationType == 'success' && (
                    <Success message={message} postion={['top-0', 'right-2','z-30']} AlertWidth={['w-80']} />
                )
            }
        </AnimatePresence>
        {/* survey list */}
        <h1 className='text-3xl text-slate-200 text-center my-10'>Liste des sondages</h1>

        <button onClick={() => { openModal(0) }} className='btn  bg-blue-700 hover:bg-blue-800 text-white  my-4'>
            Ajouter un sondage +
        </button>
        {
            surveys.map((survey) => {
                return survey.isOnline
                    ?
                    <div className="card md:w-10/12 w-11/12  bg-gray-800 border-gray-700  shadow-xl my-4 static" key={survey.id}>
                        <div className="card-body">
                            <div className='flex justify-between py-5'>
                                <h2 className="card-title">{survey.title}</h2>
                                <div><div className=' rounded-full h-2 w-2 bg-green-600 inline-block'></div> En production</div>
                            </div>
                            <p>{survey.description}</p>
                            <p>Lien : <a target='_blank' className='text-blue-500 hover:text-blue-300 ' href={'../survey/'+survey.id}>http://localhost:3000/survey/{survey.id}</a> </p>
                            <span className=' italic text-base-content'>{FormatedDate(survey.created_at)}</span>
                        </div>
                    </div>
                    :
                    <div className="card md:w-10/12 w-11/12  bg-gray-800 border-gray-700 static shadow-xl my-4" key={survey.id}>
                        <div className="card-body">
                            <div className='flex justify-between py-5'>
                                <h2 className="card-title">{survey.title}</h2>
                                <div><div className=' rounded-full  h-2 w-2 inline-block bg-blue-400'></div> En dévelopement</div>
                            </div>
                            <div className='flex flex-col md:flex-row'>
                                <p className='md:w-1/2'>{survey.description}</p>
                                <div className='md:w-1/2 flex-wrap'>
                                    <button onClick={() => {openModal(3,survey)}}  className='btn  bg-blue-700 hover:bg-blue-800 text-white  w-full my-2'>Mettre le sondage en ligne</button>
                                    <button onClick={() => {openModal(1,survey)}} className='btn text-white bg-red-600 hover:bg-red-700 mr-1 w-[49%]'>Supprimer</button>
                                    <button onClick={() => {openModal(2,survey)}} className='btn  bg-blue-700 hover:bg-blue-800 text-white  w-[49%] md:ml-1'>Modifier</button>
                                </div>
                            </div>
                            <div className='divider'></div>
                            <SurveyQuestion id={survey.id} onDelete={openModal} onAdd={openModal} />
                            <span className=' italic text-base-content'>{FormatedDate(survey.created_at)}</span>
                        </div>
                    </div>
            })}

        {
            openedModal != -1 && Modals[openedModal]
        }
    </div>


}

