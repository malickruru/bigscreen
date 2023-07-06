import React from 'react';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
    return (
        <><div>
            nav
        </div><Outlet /></>
    );
}

export default CustomerLayout;
