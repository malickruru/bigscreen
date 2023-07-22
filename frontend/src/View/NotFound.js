import React from 'react';

// Cette vue s'affiche lorsque l'url demandée n'existe pas
const NotFound = () => {
    return (
        <div className='w-full h-full flex items-center md:block'>
            <p className='w-full  mt-16 text-center leading-none text-4xl tracking-[0.4em]'>
            <span className='text-8xl md:text-[400px]  p-0 m-0  block'>404</span>page introuvable
            </p>
            
            
        </div>
    );
}

export default NotFound;
