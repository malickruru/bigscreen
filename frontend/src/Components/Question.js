import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";

const AnswerType = ({ question, next , value}) => {

    const input = useRef(null)

    useEffect(() => {
        function onEnter(event) {
            if ( event.key == 'Enter' && input?.current) {
                next(input.current.value)
            }
          }
      
          // Ajouter l'écouteur d'événement lors du montage du composant
          window.addEventListener('keydown', onEnter);
      
          // Retirer l'écouteur d'événement lors du démontage du composant
          return () => {
            window.removeEventListener('keydown', onEnter);
          };
    }, []);


    switch (question.type) {
        case 'A':
            return question.choices.map((choice) => (
                <div className='relative w-96 h-12 my-2' key={choice.id}>
                    <input type="radio" name={"radio-" + question.id} className="radio  w-full h-full  rounded-none " value={choice.id} onChange={(e) => { next(e.target.value) }}   defaultChecked={choice.id == value}/>
                    <div className='absolute  w-full h-full top-0 flex items-center justify-center pointer-events-none mix-blend-difference'>{choice.text}</div>
                </div>))
        case 'C':
            return [1, 2, 3, 4, 5].map((num) => (
                <div className='relative w-96 h-12 my-2' key={num}>
                    <input type="radio" name={"radio-" + question.id} className="radio  w-full h-full  rounded-none " value={num} onChange={(e) => { next(e.target.value) }} defaultChecked={num == value}/>
                    <div className='absolute  w-full h-full top-0 flex items-center justify-center pointer-events-none mix-blend-difference'>{num}</div>
                </div>))
        default:
            if (question.validateAs != 'textarea') {
                return <>
                    <input ref={input} type={question.validateAs} placeholder={'Entrez votre ' + question.yardstick} className='text-white my-6 bg-black py-5 outline-none  border-b-white text-xl border-b-2 border-solid min-w-1/2' value={value}/>
                    <div className=' mt-4'>
                        <button onClick={() => { next(input.current.value) }} className="  btn-square bg-white text-black hover:bg-base-content mr-3">OK</button>
                        <span className='italic'>Appuyer sur entrer</span>
                        <i className="bi bi-arrow-return-left ml-3"></i>
                    </div>
                </>
            } else {
                return <>
                <textarea ref={input}  className='text-white my-6 bg-black p-5 outline-none text-xl border-2 border-dashed w-9/12 border-white' value={value} />
                <div className=' mt-4'>
                    <button onClick={() => { next(input.current.value) }} className="  btn-square bg-white text-black hover:bg-base-content mr-3">OK</button>
                    <span className='italic'>Appuyer sur entrer</span>
                    <i className="bi bi-arrow-return-left ml-3"></i>
                </div>
            </>
            }
    }
}

const Question = ({ question, next,value,direction }) => {
    let delay = question.type == 'A' ? 0.1 : 0.5 
   
    return (
        <motion.div 
        key='question'
        initial={{ opacity: 0 , y : 10 }}
        animate={{ opacity: 1 , y:0 , transition : {type:'tween'}}}
        exit={{ opacity: 0 ,y:-10 ,transition: { delay: delay}}}
        className='flex justify-center items-center flex-col'
        >
            <div className='flex  items-center justify-center w-full mb-4 '>
                <p className='text-white mr-2 text-xl'>
                    <span > {question.id} </span>
                    <i className="bi bi-arrow-right m-2"></i>
                </p>

                <p className='text-white text-xl'>{question.text}</p>
            </div>
            <AnswerType question={question} next={next} value={value} />
        </motion.div>

    );
}

export default Question;
