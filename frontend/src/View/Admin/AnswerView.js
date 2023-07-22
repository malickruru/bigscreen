import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';



// vue présentant l'ensemble des réponses
export const AnswerView = () => {
    // ensemble des réponses
    const data = useLoaderData()
    // paramètre de l'url
    const params = useParams()
    // méthode permettant de rediriger l'utilisateur vers une autre page
    const navigate = useNavigate();

    // index des questions
    const [ids, setIds] = useState([])

    // récupérer l'index des question
    const getIds = () => {
        if(!data.answers[0]){
            return []
        }
        return data.answers[0].map((answer, key) => key)
    }
    useEffect(() => {
        setIds(getIds())
    }, []);

    // masquer ou afficher une question
    const handleCheckboxChange = (id) => {
        if (ids.includes(id)) {
            // Si l'ID est déjà dans le tableau, on le retire
            const updatedIds = ids.filter((itemId) => itemId !== id);
            setIds(updatedIds);
        } else {
            // Si l'ID n'est pas dans le tableau, on l'ajoute
            const updatedIds = [...ids, id];
            setIds(updatedIds);
        }
    };

    // masquer ou afficher toutes les questions
    const handleAllCheckboxChange = () => {
        if (ids.length == getIds().length) {
            // Si tout est sélectionner tout décocher
            setIds([]);
        } else {
            // tout cocher
            setIds(getIds());
        }
    };

    // aller à la page précédente
    const handlePreviousPage = () => {
        if (params.page == 1) {
            return
        }
        let previous = parseInt(params.page) - 1
        navigate("../responses/" + previous)
    }

    // aller à la page suivante
    const handleNextPage = () => {
        if (params.page == data.totalPages) {
            return
        }
        let next = parseInt(params.page) + 1
        navigate("../responses/" + next)
    }


    const handleGoTo = (page) => {
        navigate("../responses/" + page)
    }


    return (
        <>
                    <h1 className='text-3xl text-slate-200 text-center my-10'>Réponses du sondage</h1>

            <div className='flex justify-end md:justify-center   items-center'>
                <div className="dropdown dropdown-hover dropdown-bottom   ">
                    <label tabIndex={0} className="btn m-1 static btn-outline border-slate-200 text-slate-200 "><i className="bi bi-funnel"></i> Filtrer</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] left-[-320px]  md:left-[-400px]  p-2 px-5 bg-gray-700 drop-shadow-xl text-base-300 rounded-box md:w-[800px] h-96 overflow-y-scroll custom-scrollbar overflow-x-hidden ">
                        <h6 className='text-lg text-center text-slate-200'>Choisir les questions à afficher</h6>
                        <div className="form-control text-base-300  font-extrabold" >
                            <label className="label cursor-pointer border-b border-solid   py-4">
                                <span className="label-text text-lg">Tout sélectionner</span>
                                <input type="checkbox" className="checkbox checkbox-primary" checked={ids.length == getIds().length} onChange={handleAllCheckboxChange} />
                            </label>
                        </div>
                        {
                            getIds().map((id) => {
                                return <div className="form-control text-base-400" key={id}>
                                    <label className="label cursor-pointer border-b border-solid border-b-gray-500 py-4">
                                        <span className="label-text">{data.answers[0][id].question}</span>
                                        <input type="checkbox" className="checkbox checkbox-primary" checked={ids.includes(id)} onChange={() => { handleCheckboxChange(id) }} />
                                    </label>
                                </div>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="flex justify-center flex-col items-center py-5">

                {data.answers.map((answer, key) => {
                    return <table className="table static w-3/4 text-gray-400 my-4" key={key}>

                        <thead>
                            <tr className='bg-gray-700 text-gray-400 text-lg'>

                                <th >N°</th>
                                <th >Corps de la question</th>
                                <th >Réponse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answer.map((item, key) => {
                                if (ids.includes(key)) {
                                    return <tr className='bg-gray-800 border-gray-700' key={key}>
                                        <th className=' font-medium text-slate-200'>{key + 1}</th>
                                        <td className=''>{item.question}</td>
                                        <td className=''>{item.answer}</td>
                                    </tr>;
                                }

                            })}
                        </tbody>
                    </table>;
                })}
            </div>
            <div className='flex justify-center items-center py-5'>
                <div className="join">
                    <button className="join-item btn bg-gray-800 rounded-none" onClick={handlePreviousPage}>«</button>
                    <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="join-item btn bg-gray-800 rounded-none">Page {params.page}</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] left-[-30px]  p-2 bg-gray-700  text-slate-200 rounded-none  h-48 overflow-y-scroll custom-scrollbar overflow-x-hidden w-[150px]">
                            {
                                
                                Array.from({ length: data.totalPages }, (_, index) => index + 1).map((page) => (<li  className='p-3   cursor-pointer slate-200space-nowrap hover:bg-slate-200 hover:text-primary' key={page} onClick={() => {handleGoTo(page)}}>Page {page} </li>))
                            }
                        </ul>
                    </div>
                    <button className="join-item btn bg-gray-800 rounded-none" onClick={handleNextPage}>»</button>
                </div>
            </div>
        </>
    );
}

