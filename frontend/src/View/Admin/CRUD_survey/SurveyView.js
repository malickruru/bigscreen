import React, { useEffect, useState } from 'react';
import { FormatedDate } from '../../../Utils/Date';
import { AnimatePresence } from 'framer-motion';
import Error from '../../../Components/Error';
import { listQuestion, listSurvey, listUnreleasedQuestions } from '../../../Services/Route';
import Success from '../../../Components/Success';
import { AddSurvey, Addquestion, DeleteQuestion, DeleteSurvey, EditSurvey, Modal, ReleaseSurvey } from './Modal';


const SurveyQuestion = ({ id,onDelete,onAdd }) => {
    const [questions, setquestion] = useState(false);

    const getQuestion = async () => {
        if (!questions) {
            let res = await listUnreleasedQuestions.getResponse({ id: id })
            setquestion(res.data)
        }
    }
    return (
        <div className="collapse bg-[#111827] collapse-arrow rounded-none  ">
            <input type="checkbox" onChange={getQuestion} />
            <div className="collapse-title text-xl font-medium">
                Questions du sondage
            </div>
            <div className="collapse-content flex justify-center items-center flex-col">
                <button onClick={() => {onAdd(5,{surveyId : id})}} className='btn bg-blue-600 hover:bg-blue-700 text-white'>Ajouter +</button>
                {
                    !questions ? <span className="loading loading-spinner "></span> :
                        <table className="table w-full text-black my-5" >
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
                                {questions.map((question, key) => {
                                    return <tr className='bg-gray-800 border-gray-700 text-slate-200' key={key}>
                                        <th className=' font-medium text-slate-200'>{key + 1}</th>
                                        <td >{question.text}</td>
                                        <td >{question.type}</td>
                                        <td >
                                            {
                                                question.type == 'A' && <ul>
                                                    {question.choices.map((choice) => {
                                                        return <li key={choice} className=' list-disc'>{choice.text}</li>
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


export const SurveyView = () => {

    const [surveys, setSurvey] = useState([])
    const [surveyData, setSurveyData] = useState({})
    const [loading, setLoading] = useState(false)
    const [[NotificationType, message], setNotification] = useState([false, ''])
    const [openedModal, setOpenedModal] = useState(-1)

    useEffect(() => {
        getSurvey()
    }, []);

    // lorsqu'il ya une erreur
    useEffect(() => {
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

    const showNotification = (type, msg) => {
        setNotification([type, msg])
    }

    const openModal = (modalId,data = {}) => {
        setSurveyData(data)
        setOpenedModal(modalId)
    }

    const closeModal = () => {
        setOpenedModal(-1)
    }

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


    return <div className='container mx-auto p-7 flex flex-col justify-center items-center relative'>
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
                    <div className="card w-10/12 bg-gray-800 border-gray-700  shadow-xl my-4" key={survey.id}>
                        <div className="card-body">
                            <div className='flex justify-between py-5'>
                                <h2 className="card-title">{survey.title}</h2>
                                <div><div className=' rounded-full h-2 w-2 bg-green-600 inline-block'></div> En production</div>
                            </div>
                            <p>{survey.description}</p>
                            <span className=' italic text-base-content'>{FormatedDate(survey.created_at)}</span>
                        </div>
                    </div>
                    :
                    <div className="card w-10/12  bg-gray-800 border-gray-700  shadow-xl my-4" key={survey.id}>
                        <div className="card-body">
                            <div className='flex justify-between py-5'>
                                <h2 className="card-title">{survey.title}</h2>
                                <div><div className=' rounded-full  h-2 w-2 inline-block bg-blue-400'></div> En dévelopement</div>
                            </div>
                            <div className='flex '>
                                <p className='w-1/2'>{survey.description}</p>
                                <div className='w-1/2 flex-wrap'>
                                    <button onClick={() => {openModal(3,survey)}}  className='btn  bg-blue-700 hover:bg-blue-800 text-white  w-full my-2'>Mettre le sondage en ligne</button>
                                    <button onClick={() => {openModal(1,survey)}} className='btn text-white bg-red-600 hover:bg-red-700 mr-1 w-[49%]'>Supprimer</button>
                                    <button onClick={() => {openModal(2,survey)}} className='btn  bg-blue-700 hover:bg-blue-800 text-white  w-[49%] ml-1'>Modifier</button>
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

