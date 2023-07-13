import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';




export const AnswerView = () => {
    const data = useLoaderData()
    const params = useParams()
    const navigate = useNavigate();

    const [ids, setIds] = useState([])

    const getIds = () => {
        return data.answers[0].map((answer, key) => key)
    }
    useEffect(() => {
        setIds(getIds())
    }, []);

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

    const handleAllCheckboxChange = () => {
        if (ids.length == getIds().length) {
            // Si tout est sélectionner tout décocher
            setIds([]);
        } else {
            // tout cocher
            setIds(getIds());
        }
    };

    const handlePreviousPage = () => {
        if (params.page == 1) {
            return
        }
        let previous = parseInt(params.page) - 1
        navigate("../reponse/" + previous)
    }

    const handleNextPage = () => {
        if (params.page == data.totalPages) {
            return
        }
        let next = parseInt(params.page) + 1
        navigate("../reponse/" + next)
    }


    const handleGoTo = (page) => {
        navigate("../reponse/" + page)
    }


    return (
        <>
            <div className='flex justify-center items-center'>
                <div className="dropdown dropdown-hover dropdown-bottom  ">
                    <label tabIndex={0} className="btn m-1 btn-outline btn-primary "><i className="bi bi-funnel"></i> Filtrer</label>
                    <ul tabIndex={0} className="dropdown-content z-[1]  left-[-400px]  p-2 px-5 bg-slate-200 drop-shadow-xl text-base-300 rounded-box w-[800px] h-96 overflow-y-scroll custom-scrollbar overflow-x-hidden ">
                        <h6 className='text-lg text-center'>Choisir les questions à afficher</h6>
                        <div className="form-control text-base-300  font-extrabold" >
                            <label className="label cursor-pointer border-b border-solid border-b-black py-4">
                                <span className="label-text">Tout sélectionner</span>
                                <input type="checkbox" className="checkbox checkbox-primary" checked={ids.length == getIds().length} onChange={handleAllCheckboxChange} />
                            </label>
                        </div>
                        {
                            getIds().map((id) => {
                                return <div className="form-control text-base-400" key={id}>
                                    <label className="label cursor-pointer border-b border-solid border-b-black py-4">
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
                    return <table className="table w-3/4 text-black my-5" key={key}>

                        <thead>
                            <tr className='bg-base-200 text-slate-50'>

                                <th className=' border-solid border-black border-2'>N°</th>
                                <th className=' border-solid border-black border-2'>Corps de la question</th>
                                <th className=' border-solid border-black border-2'>Réponse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answer.map((item, key) => {
                                if (ids.includes(key)) {
                                    return <tr key={key}>
                                        <th className=' border-solid border-black border-2'>{key + 1}</th>
                                        <td className=' border-solid border-black border-2'>{item.question}</td>
                                        <td className=' border-solid border-black border-2'>{item.answer}</td>
                                    </tr>;
                                }

                            })}
                        </tbody>
                    </table>;
                })}
            </div>
            <div className='flex justify-center items-center py-5'>
                <div className="join">
                    <button className="join-item btn btn-primary rounded-none" onClick={handlePreviousPage}>«</button>
                    <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="join-item btn btn-primary rounded-none">Page {params.page}</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] left-[-10px]   p-2 bg-primary  text-white rounded-none  h-48 overflow-y-scroll custom-scrollbar overflow-x-hidden ">
                            {
                                
                                Array.from({ length: data.totalPages }, (_, index) => index + 1).map((page) => (<li  className='p-3   cursor-pointer whitespace-nowrap hover:bg-white hover:text-primary' key={page} onClick={() => {handleGoTo(page)}}>Page {page} </li>))
                            }
                        </ul>
                    </div>
                    <button className="join-item btn btn-primary rounded-none" onClick={handleNextPage}>»</button>
                </div>
            </div>
        </>
    );
}

