import React from 'react';

const AnswerType = ({type,yardstick}) => {
    
    switch (type) {
        case 'A':
            return <p>A</p>
        case 'C':
            return <p>A</p>
        default:
            return <input type="text" placeholder={'Entrez votre ' + yardstick} className='text-white my-6 bg-black py-5 outline-none  border-b-white text-2xl border-b-2 border-solid' />
            ;
    }
}

const Question = ({id,text,type,yardstick}) => {
    return (
        <>
        <div className='flex  items-center w-full md:w-1/4'>
            <p className='text-white mr-2 text-2xl'>
            <span > {id} </span>
            <i className="bi bi-arrow-right m-2"></i>
            </p>
            
            <p className='text-white text-2xl'>{text}</p>
        </div>
        <AnswerType  type={type} yardstick={yardstick}/>
        <div className='w-full md:w-1/4 mt-4'>
        <button className="  btn-square bg-white text-black hover:bg-base-content mr-3">OK</button>
        <span className='italic'>Appuyer sur entrer</span>
        <i className="bi bi-arrow-return-left ml-3"></i>
        </div>
        
        </>
        
    );
}

export default Question;
