import React from 'react';
import { motion } from "framer-motion";

//  message d'erreur

const Error = ({ message,postion = ['top-20'] , AlertWidth = ['w-1/2'] }) => {
    return (
        <motion.div
            className={"alert alert-error my-4  fixed " + postion.join(' ') +' '+ AlertWidth.join(' ')}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 }}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{message}</span>
        </motion.div >
    );
}

export default Error;
