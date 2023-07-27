import React from 'react';

// Ce composant représente une vue qui s'affiche lorsque l'URL demandée n'existe pas. Il est utilisé pour afficher une page d'erreur 404 lorsque l'utilisateur accède à une page inexistante.
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
