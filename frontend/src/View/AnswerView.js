import React from 'react';
import { useLoaderData } from 'react-router-dom';

// vue permettant à un utilisateur de visionner ces réponses
const AnswerView = () => {
    // listes des réponses
    const answers = useLoaderData()
    return (
        <div className="container mx-auto  md:p-5 mt-24   md:relative">
            {
                answers.map((answer,key) => {
                    return <div className='mb-16 ml-12 ' key={key}>
                        <div className='flex items-center  md:my-0'>
                            <div className='w-12 h-10 md:w-16 md:h-16 rounded-full p-0 bg-white text-black md:text-lg flex items-center justify-center'>
                                {key + 1}
                            </div>
                            <div className='ml-5 p-5 h-24 w-full'>
                                <h1 className='text-xl text-white'>
                                    {answer.question}
                                </h1>
                                <div class="divider"></div>
                            </div>
                        </div>
                        <div className='p-5 text-xl text-center md:text-left text-base-400 mt-12 md:mt-0'>
                            {answer.answer}
                        </div>

                    </div>

                })
            }
        </div>

    );
}

export default AnswerView;
