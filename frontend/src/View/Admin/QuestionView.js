import React from 'react';
import { useLoaderData } from 'react-router-dom';

const QuestionView = () => {
    const questions = useLoaderData();
    return (
        <div className="flex justify-center items-center py-5">
            <table className="table w-3/4 text-black">
                {/* head */}
                <thead >
                    <tr className='bg-base-200 text-slate-50'>
                        
                        <th className=' border-solid border-black border-2'>N°</th>
                        <th className=' border-solid border-black border-2'>Corps de la question</th>
                        <th className=' border-solid border-black border-2'>type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, key) => {
                            return <tr key={key}>
                                <th className=' border-solid border-black border-2'>{key+1 }</th>
                                <td className=' border-solid border-black border-2'>{question.text}</td>
                                <td className=' border-solid border-black border-2'>{question.type}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default QuestionView;
