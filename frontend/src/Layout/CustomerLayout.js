import React from 'react';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
    return (
        <>
        <div>
        <h1>
            nav
            </h1>
        </div>
        <Outlet />
        </>
    );
}

export default CustomerLayout;
