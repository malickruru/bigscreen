import React from 'react';
import { motion } from "framer-motion";

const LoadingMessage = ({ postion = ['top-20'] , AlertWidth = ['w-1/2'] }) => {
    return (
        <motion.div
            className={"alert alert-info my-4  absolute " + postion.join(' ') +' '+ AlertWidth.join(' ')}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 }}}>
            <span className="loading loading-spinner loading-md"></span>
        </motion.div >
    );
}

export default LoadingMessage;
