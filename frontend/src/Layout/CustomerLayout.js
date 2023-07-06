import React from 'react';
import { Outlet } from 'react-router-dom';
import {ReactComponent as BigScreenLogo} from '../Assets/Images/BigScreenLogo.svg'  ;

const CustomerLayout = () => {
    return (
        <>
            <div className="navbar p-5 ">
                <BigScreenLogo fill="#fff" width={300}/>
                {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
            </div>
            <Outlet />
            
            
        </>
    );
}

export default CustomerLayout;
