import React from 'react';
import { useLoaderData } from 'react-router-dom';

// Ce composant représente la vue qui affiche toutes les questions d'un sondage.
// 
const QuestionView = () => {
    // ensemble des questions
    const questions = useLoaderData();
    return (
        <><h1 className='text-3xl text-slate-200 text-center my-10'>Questions du sondage</h1><div className="flex justify-center items-center py-5">
            <table className="table static w-3/4 text-gray-400">
                {/* head */}
                <thead>
                    <tr className='bg-gray-700 text-gray-400 text-lg'>
                        <th className=' '>N°</th>
                        <th className=' '>Corps de la question</th>
                        <th className=' '>type</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, key) => {
                        return <tr key={key} className='bg-gray-800 border-gray-700'>
                            <th className=' font-medium text-slate-200'>{key + 1}</th>
                            <td className=' '>{question.text}</td>
                            <td className=' '>{question.type}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div></>
    );
}

export default QuestionView;
