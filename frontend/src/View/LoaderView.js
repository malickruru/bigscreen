import React from 'react';

// Ce composant représente la vue de chargement affichée lorsque l'application effectue une requête en cours de traitement.
const LoaderView = () => {
    return (
        <div className=" flex justify-center items-center flex-col h-screen">
           <span className="loading loading-ring  w-48"></span>
           <p>Chargement...</p>
        </div>
    );
}

export default LoaderView;
