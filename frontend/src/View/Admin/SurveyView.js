import React, { useEffect, useState } from 'react';
import { Form, useActionData, useLoaderData, useSubmit } from 'react-router-dom';
import { FormatedDate } from '../../Utils/Date';
import Input from '../../Components/Forms/Input';
import Textarea from '../../Components/Forms/Textarea';
import { AnimatePresence } from 'framer-motion';
import LoadingMessage from '../../Components/LoadingMessage';
import Error from '../../Components/Error';
import Success from '../../Components/Success';
import { listQuestion } from '../../Services/Route';


const SurveyQuestion = ({ id }) => {
    const [questions, setquestion] = useState(false);

    const getQuestion = async () => {
        if(!questions){
            let res = await listQuestion.getResponse({id : id})
            setquestion(res.data)
        }
    }
    return (
        <div className="collapse bg-white collapse-arrow rounded-none  ">
            <input type="checkbox" onChange={getQuestion} />
            <div className="collapse-title text-xl font-medium">
                Questions du sondage
            </div>
            <div className="collapse-content">
                {
                    !questions ? <span className="loading loading-spinner "></span> : 
                    <table className="table w-3/4 text-black my-5" >
                        <thead>
                            <tr className='bg-primary text-slate-50'>

                                <th className=' border-solid border-black border-2'>N°</th>
                                <th className=' border-solid border-black border-2'>Corps de la question</th>
                                <th className=' border-solid border-black border-2'>Type</th>
                                <th className=' border-solid border-black border-2'>Choix</th>
                                <th className=' border-solid border-black border-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, key) => {
                                    return <tr key={key}>
                                        <th className=' border-solid border-black border-2'>{key + 1}</th>
                                        <td className=' border-solid border-black border-2'>{question.text}</td>
                                        <td className=' border-solid border-black border-2'>{question.type}</td>
                                        <td className=' border-solid border-black border-2'>
                                            {
                                                question.type == 'A' && <ul>
                                                    {question.choices.map((choice) => {
                                                        return <li>choice.text</li>
                                                    })}
                                                </ul>
                                            }
                                        </td>
                                        <td className=' border-solid border-black border-2'><i className="bi bi-trash text-red-600 p-2 cursor-pointer" title='Supprimer'></i>
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
    let submit = useSubmit();
    const surveys = useLoaderData()
    let errorMessage = useActionData();
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState('');
    const [loading, setloading] = useState(false);

    // lorsqu'il ya une erreur
    useEffect(() => {
        if (errorMessage) {
            seterror(true)
            setloading(false)
            setTimeout(() => {
                seterror(false)
            }, 5000)
        }
    }, [errorMessage]);


    useEffect(() => {
        // lorsqu'on a ajouté un sondage la modal addSurvey est ouverte
        if (window.addSurvey.open) {
            setloading(false)
            window.addSurvey.close()
            setsuccess('ajout réussit')
            setTimeout(() => {
                setsuccess('')
            }, 5000)
        }
    }, [surveys]);



    return <div className='container mx-auto p-7 flex flex-col justify-center items-center relative'>
        {/* notification */}
        <AnimatePresence >
            {
                error && (
                    <Error message={errorMessage} postion={['top-0', 'right-2']} AlertWidth={['w-80']} />
                )
            }
            {
                success && (
                    <Success message={success} postion={['top-0', 'right-2']} AlertWidth={['w-80']} />
                )
            }
        </AnimatePresence>
        {/* survey list */}
        <h1 className='text-3xl text-slate-200 text-center my-10'>Liste des sondages</h1>

        <button onClick={() => window.addSurvey.showModal()} className='btn  bg-blue-700 hover:bg-blue-800 text-white  my-4'>
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
                                    <button className='btn  bg-blue-700 hover:bg-blue-800 text-white  w-full my-2'>Mettre le sondage en ligne</button>
                                    <button className='btn text-white bg-red-700 hover:bg-red-800 mr-1 w-[49%]'>Supprimer</button>
                                    <button className='btn  bg-blue-700 hover:bg-blue-800 text-white  w-[49%] ml-1'>Modifier</button>
                                </div>
                            </div>
                            <div className='divider'></div>
                            <SurveyQuestion id={survey.id} />
                            <span className=' italic text-base-content'>{FormatedDate(survey.created_at)}</span>
                        </div>
                    </div>
            })}

        <dialog id="addSurvey" className="modal ">
            <Form method="post" className="modal-box bg-slate-100 text-black " onSubmit={
                () => {
                    setloading(true);
                    submit()
                }
            }>
                <h3 className="font-bold text-lg">Ajouter un sondage</h3>
                <Input label={'Titre du sondage'} type={'text'} name={'title'} placeholder={'Mon super sondage'} />
                <Textarea label={'Description du sondage'} name={'description'} />
                {
                    loading ? <div className='btn  bg-blue-700 hover:bg-blue-800 text-white '><span className="loading loading-spinner "></span> </div> :
                        <button className='btn  bg-blue-700 hover:bg-blue-800 text-white ' type="submit" name="action" value="addSurvey">
                            Ajouter
                        </button>
                }

            </Form>
            <form method="dialog" className="modal-backdrop ">
                <button>close</button>
            </form>
        </dialog>
    </div>


}

