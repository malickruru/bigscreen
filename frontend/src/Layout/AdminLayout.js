import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ReactComponent as BigScreenLogo } from '../Assets/Images/BigScreenLogo.svg';


const AdminLayout = () => {
    return (
        <>
            {/* drawer */}
            <div className='h-screen flex flex-row'>
                <div className="drawer h-full  basis-1/5  lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-primary  text-white">
                            {/* Sidebar content here */}
                            <div className='flex justify-center'>
                                <BigScreenLogo fill="#fff" width={250} />
                            </div>
                            <div className='divider before:bg-slate-200 after:bg-slate-200'></div>
                            <li className='my-2'>
                                <NavLink
                                to="/administration"
                                className={({ isActive }) => isActive ? "bg-white text-primary text-lg" : "text-lg"}><i className="bi bi-house-door-fill"></i>ACCUEIL</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                to="/administration/question"
                                className={({ isActive }) => isActive ? "bg-white text-primary text-lg" : "text-lg"}><i className="bi bi-question-square-fill"></i>QUESTIONS</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                to="/administration/reponse"
                                className={({ isActive }) => isActive ? "bg-white text-primary text-lg" : "text-lg"}><i className="bi bi-list-check"></i>REPONSES</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                to="/administration/sondage"
                                className={({ isActive }) => isActive ? "bg-white text-primary text-lg" : "text-lg"}><i className="bi bi-folder-fill"></i>SONDAGES</NavLink>
                            </li>


                        </ul>

                    </div>
                </div>


                {/* main */}
                <div className='h-full bg-white basis-4/5'><Outlet /></div>
            </div>


        </>
    );
}

export default AdminLayout;
