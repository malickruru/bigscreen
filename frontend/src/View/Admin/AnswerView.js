import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';


const Filter = ({labels}) => {
    

}


export const AnswerView = () => {
    
    return (
        <>
        <div>
            <Filter 
                labels={data.answers[0].map((answer) => {
                    return {id : answer.id , question : answer.question}
                })}
                />
        </div><div className="flex justify-center flex-col items-center py-5">

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
                                return <tr key={key}>
                                    <th className=' border-solid border-black border-2'>{key + 1}</th>
                                    <td className=' border-solid border-black border-2'>{item.question}</td>
                                    <td className=' border-solid border-black border-2'>{item.answer}</td>
                                </tr>;
                            })}
                        </tbody>
                    </table>;
                })}
            </div></>
    );
}

