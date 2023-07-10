import React, { useRef, useState } from 'react';

const AnswerType = ({ question , next }) => {

    const input = useRef(null)

    

    switch (question.type) {
        case 'A':
            return question.choices.map((choice) => (
            <div className='relative w-96 h-12 my-2' key={choice.id}>
                <input type="radio" name={"radio-"+question.id} className="radio  w-full h-full  rounded-none " value={choice.id} onChange={(e) => {next(e.target.value)}}/>
                <div className='absolute  w-full h-full top-0 flex items-center justify-center pointer-events-none mix-blend-difference'>{choice.text}</div>
            </div> ))
        case 'C':
            return [1,2,3,4,5].map((num) => (
                <div className='relative w-96 h-12 my-2' key={num}>
                    <input type="radio" name={"radio-"+question.id} className="radio  w-full h-full  rounded-none " value={num} onChange={(e) => {next(e.target.value)}}/>
                    <div className='absolute  w-full h-full top-0 flex items-center justify-center pointer-events-none mix-blend-difference'>{num}</div>
                </div> ))
        default:
            return <>
            <input ref={input} type="text"  placeholder={'Entrez votre ' + question.yardstick} className='text-white my-6 bg-black py-5 outline-none  border-b-white text-3xl border-b-2 border-solid' />
            <div className=' mt-4'>
                <button onClick={() => {next(input.current.value)}}  className="  btn-square bg-white text-black hover:bg-base-content mr-3">OK</button>
                <span className='italic'>Appuyer sur entrer</span>
                <i className="bi bi-arrow-return-left ml-3"></i>
            </div>
            </>
                ;
    }
}

const Question = ({ question,next }) => {
    return (
        <>
            <div className='flex  items-center justify-center w-full mb-4 '>
                <p className='text-white mr-2 text-xl'>
                    <span > {question.id} </span>
                    <i className="bi bi-arrow-right m-2"></i>
                </p>

                <p className='text-white text-xl'>{question.text}</p>
            </div>
            <AnswerType question={question} next={next}/>
        </>

    );
}

export default Question;
