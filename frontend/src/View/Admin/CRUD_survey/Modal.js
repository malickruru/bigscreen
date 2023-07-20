import React, { useState } from 'react';
import { Children } from 'react';
import { Validate } from '../../../Utils/Validate';
import { addQuestion, addSurvey, deleteQuestion, deleteSurvey, editSurvey, releaseSurvey } from '../../../Services/Route';

// Composant popup
const Modal = ({ onClose, title, btnData, children, onsubmit }) => {
    const [loading, setLoading] = useState(false)

    // chaque popup à une fonction pour soumettre les données
    const submitData = async () => {
        setLoading(true)

        const result = await onsubmit();
        
        if (result.close == false) {
            console.log(result);
            setLoading(false)
            return
        }
        setLoading(false)
        onClose()
    }

    return (
        <div className='fixed backdrop-blur-sm z-10 top-0 bottom-0 right-0 left-0 bg-black/30 flex justify-center items-center' onClick={onClose}>
            {/* <!-- Modal content --> */}
            <div onClick={(e) => e.stopPropagation()} className="relative   rounded-lg shadow w-1/3 bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                    <h3 className="text-xl  font-semibold text-white">
                        {title}
                    </h3>
                    <button onClick={onClose} type="button" className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center justify-center p-6 space-x-2 border-t  rounded-b border-gray-600">
                    {
                        loading ? <button type="button" className={`text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-${btnData.color}-600 hover:bg-${btnData.color}-700 focus:ring-${btnData.color}-800`}><span className="loading loading-spinner"></span></button> :
                            <button onClick={submitData} type="button" className={`text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-${btnData.color}-600 hover:bg-${btnData.color}-700 focus:ring-${btnData.color}-800`}>{btnData.text}</button>

                    }
                    <button onClick={onClose} type="button" className="focus:ring-4 focus:outline-none  rounded-lg border  text-sm font-medium px-5 py-2.5  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Annuler</button>
                </div>
            </div>
        </div>
    );
}

// ajout de sondage
const AddSurvey = ({ onClose, onNotify, onUpdate }) => {
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');

    const handleAddSurvey = async () => {
        // valider les données
        let Validation = [Validate(title, 'text', 'titre'), Validate(description, 'text', 'description')]
        for (let index = 0; index < Validation.length; index++) {
            if (Validation[index].error) {
                onNotify('error', Validation[index].message)
                return { close: false }
            }
        }
        let res = await addSurvey.getResponse({}, {
            title: title,
            description: description
        })
        if (!res.success) {
            onNotify('error', res.message)
        } else {
            // mettre a jour les sondages
            onUpdate()
            onNotify('success', res.message)
        }
        return { close: true }
    }

    return (
        <Modal onClose={onClose} title="Ajouter un sondage" btnData={{ text: 'Ajouter', color: 'blue' }} onsubmit={handleAddSurvey}>
            <div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Titre du sondage</label>
                    <input onChange={(e) => { settitle(e.target.value) }} type="text" className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" />
                </div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Description du sondage</label>
                    <textarea onChange={(e) => { setdescription(e.target.value) }} type="text" className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="ma description" />
                </div>
            </div>
        </Modal>
    )

}

// supprimer un sondage
const DeleteSurvey = ({ onClose, onNotify, onUpdate, surveyData }) => {
    const handleDeleteSurvey = async () => {
        let res = await deleteSurvey.getResponse({ id: surveyData.id }, {})
        if (!res.success) {
            onNotify('error', res.message)
        } else {
            // mettre a jour les sondages
            onUpdate()
            onNotify('success', res.message)
        }
        return { close: true }
    }

    return (
        <Modal onClose={onClose} title="Supprimer un sondage" btnData={{ text: 'Oui, je suis sûr', color: 'red' }} onsubmit={handleDeleteSurvey}>
            <div>
                <svg className="mx-auto mb-4 text-gray-200 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-center text-gray-400 ">Êtes-vous sûr de vouloir supprimer le sondage intitulé : {surveyData.title} </h3>
            </div>
        </Modal>
    )

}


// mettre a jour les information d'un sondage
const EditSurvey = ({ onClose, onNotify, onUpdate, surveyData }) => {
    const [title, settitle] = useState(surveyData.title);
    const [description, setdescription] = useState(surveyData.description);

    const handleEditSurvey = async () => {
        // valider les données
        let Validation = [Validate(title, 'text', 'titre'), Validate(description, 'text', 'description')]
        for (let index = 0; index < Validation.length; index++) {

            if (Validation[index].error) {
                onNotify('error', Validation[index].message)
                return { close: false }
            }
        }
        let res = await editSurvey.getResponse({ id: surveyData.id }, {
            title: title,
            description: description
        })
        if (!res.success) {
            onNotify('error', res.message)
        } else {
            // mettre a jour les sondages
            onUpdate()
            onNotify('success', res.message)
        }
        return { close: true }
    }

    return (
        <Modal onClose={onClose} title="Modifier un sondage" btnData={{ text: 'Modifier', color: 'blue' }} onsubmit={handleEditSurvey}>
            <div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Titre du sondage</label>
                    <input defaultValue={title} onChange={(e) => { settitle(e.target.value) }} type="text" className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" />
                </div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Description du sondage</label>
                    <textarea defaultValue={description} onChange={(e) => { setdescription(e.target.value) }} type="text" className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="ma description" />
                </div>
            </div>
        </Modal>
    )

}

// mettre un sondage en ligne
const ReleaseSurvey = ({ onClose, onNotify, onUpdate, surveyData }) => {
    const handleReleaseSurvey = async () => {
        let res = await releaseSurvey.getResponse({ id: surveyData.id }, {})
        if (!res.success) {
            onNotify('error', res.message)
        } else {
            // mettre a jour les sondages
            onUpdate()
            onNotify('success', res.message)
        }
        return { close: true }
    }

    return (
        <Modal onClose={onClose} title={"Mettre le sondage : " + surveyData.title + " en ligne"} btnData={{ text: 'Oui, je suis sûr', color: 'green' }} onsubmit={handleReleaseSurvey}>
            <div>
                <svg className="mx-auto mb-4 text-gray-200 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal  text-gray-400 ">Une fois en production un sondage ne peut plus être modifier et il ne sera plus possible d'y ajouter des questions , <br/> Êtes-vous sûr de vouloir continuer ? </h3>
            </div>
        </Modal>
    )

}

// supprimer une question
const DeleteQuestion = ({ onClose, onNotify, onUpdate, questionData }) => {
    const handleDeleteQuestion = async () => {
        let res = await deleteQuestion.getResponse({ id: questionData.id }, {})
        if (!res.success) {
            // mettre a jour les sondages
            onUpdate()
            onNotify('error', res.message)
        } else {
            onUpdate()
            onNotify('success', res.message)
        }
        return { close: true }
    }

    return (
        <Modal onClose={onClose} title="Supprimer une question" btnData={{ text: 'Oui, je suis sûr', color: 'red' }} onsubmit={handleDeleteQuestion}>
            <div>
                <svg className="mx-auto mb-4 text-gray-200 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-center text-gray-400 ">Êtes-vous sûr de vouloir supprimer la question suivante : {questionData.text} </h3>
            </div>
        </Modal>
    )

}

// Ajouter une question
const Addquestion = ({ onClose, onNotify, onUpdate, questionData }) => {
    const [text, settext] = useState('');
    const [yardstick, setyardstick] = useState('');
    const [type, settype] = useState('');
    const [choices, setchoices] = useState(['autre choix']);
    const [validateAs, setvalidateAs] = useState('number');

    const handleAddquestion = async () => {
        // valider les données
        let Validation = [
            Validate(text, 'text', 'libellée'),
            Validate(yardstick, 'text', 'critère étudié'),
            Validate(type, 'text', 'type'),
        ]

        for (let index = 0; index < Validation.length; index++) {
            
            if (Validation[index].error) {
                
                onNotify('error', Validation[index].message)
                return { close: false }
            }
        }

        let res = await addQuestion.getResponse({}, {
            "survey_id": questionData.surveyId,
            "text": text,
            "yardstick": yardstick,
            "type": type,
            "choices": [...choices],
            "validateAs": validateAs
        })
        if (!res.success) {
            onNotify('error', res.message)
        } else {
            onUpdate()
            onNotify('success', res.message)
        }
        return { close: true }
    }

    const handleUpdateChoice = (val, id) => {
        let newArr = [...choices];
        newArr[id] = val
        setchoices(newArr)
    }

    const handleDeleteChoice = () => {
        let newArr = [...choices];
        newArr.pop()
        setchoices(newArr)
    }

    return (
        <Modal onClose={onClose} title="Ajouter une question" btnData={{ text: 'Ajouter', color: 'blue' }} onsubmit={handleAddquestion}>
            <div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Libellée de la question</label>
                    <input onChange={(e) => { settext(e.target.value) }} type="text" className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" />
                </div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Critère étudié</label>
                    <input onChange={(e) => { setyardstick(e.target.value) }} type="text" className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" />
                </div>
                <div className='my-10'>
                    <label className="block mb-2 text-sm font-medium text-white">Type de la question</label>
                    <select onChange={(e) => { settype(e.target.value) }} className="select  border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
                        <option disabled selected value={''}>Type de la question</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                    </select>
                </div>
                {
                    type == 'A' && <div className='my-10'>
                        <div className='flex items-center'>
                            <label className="block mb-2 text-sm font-medium text-white">Choix</label>
                            <button className=' btn btn-circle  bg-blue-600 text-white hover:bg-blue-700 m-3' title='ajouter un choix' onClick={() => { setchoices([...choices, 'autre choix']) }} >+</button>
                            <button className=' btn btn-circle  bg-red-600 text-white hover:bg-red-700 m-3' title='retirer un choix' onClick={handleDeleteChoice} >-</button>

                        </div>
                        <div className='flex flex-wrap'>
                        {
                            choices.map((choice, idx) => <input key={idx} onChange={(e) => { handleUpdateChoice(e.target.value, idx) }} type="text" className=" border m-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-28 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" defaultValue={choice} />
                            )
                        }
                        </div>
                       
                    </div>
                }
                {
                    type == 'B' && <div className='my-10'>
                        <label className="block mb-2 text-sm font-medium text-white">Type de valeur attendu</label>
                        <select onChange={(e) => { setvalidateAs(e.target.value) }} className="select  border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white">
                            <option disabled value={''}>Type de valeur attendu</option>
                            <option value='text'>texte</option>
                            <option selected value='number'>nombre</option>
                            <option value='textarea'>Paragraphe ou long texte</option>
                        </select>
                    </div>
                }


            </div>
        </Modal>
    )

}



export { Modal, AddSurvey, DeleteSurvey, EditSurvey, ReleaseSurvey, DeleteQuestion, Addquestion }