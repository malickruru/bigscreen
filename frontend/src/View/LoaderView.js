import React from 'react';

// vue de chargement des pages lorsqu'il y a une requête en cour
const LoaderView = () => {
    return (
        <div className=" flex justify-center items-center flex-col h-screen">
           <span className="loading loading-ring  w-48"></span>
           <p>Chargement...</p>
        </div>
    );
}

export default LoaderView;
