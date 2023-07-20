import React from 'react';
import { useLoaderData } from 'react-router-dom';

// vue permettant à un utilisateur de visionner ces réponses
const AnswerView = () => {
    // listes des réponses
    const answers = useLoaderData()
    return (
        <div className="container mx-auto  p-5 mt-24   relative">
            {
                answers.map((answer,key) => {
                    return <div className='mb-16 ml-12'>
                        <div className='flex items-center'>
                            <div className='w-16 h-16 rounded-full bg-white text-black text-lg flex items-center justify-center'>
                                {key + 1}
                            </div>
                            <div className='ml-5 p-5 h-24 w-full'>
                                <h1 className='text-xl text-white'>
                                    {answer.question}
                                </h1>
                                <div class="divider"></div>
                            </div>
                        </div>
                        <div className='p-5 text-xl text-base-400'>
                            {answer.answer}
                        </div>

                    </div>

                })
            }
        </div>

    );
}

export default AnswerView;
