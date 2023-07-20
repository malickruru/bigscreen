import React from 'react';
import { Outlet } from 'react-router-dom';
import {ReactComponent as BigScreenLogo} from '../Assets/Images/BigScreenLogo.svg'  ;

// layout de l'interface client
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
