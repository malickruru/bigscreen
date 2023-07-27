import React from 'react';
import { Outlet } from 'react-router-dom';
import {ReactComponent as BigScreenLogo} from '../Assets/Images/BigScreenLogo.svg'  ;

// Ce composant représente le layout (mise en page) de l'interface client. Il est destiné à être utilisé comme un conteneur pour les pages de l'application côté client.


const CustomerLayout = () => {
    return (
        <>
            <div className="navbar p-5 absolute top-0">
                <BigScreenLogo fill="#fff" width={300}/>
            </div>
            <Outlet />
            
            
        </>
    );
}

export default CustomerLayout;
