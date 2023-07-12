import React from 'react';
import { Form, NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { ReactComponent as BigScreenLogo } from '../Assets/Images/BigScreenLogo.svg';
import { activeSurvey } from '../Utils/ActiveSurvey';


const AdminLayout = () => {
    const surveys = useLoaderData();
    
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
                        <ul className="menu p-4 w-80 h-full bg-primary relative text-white">
                            {/* Sidebar content here */}
                            <div className='flex justify-center'>
                                <BigScreenLogo fill="#fff" width={250} />
                            </div>
                            <div className='divider before:bg-slate-200 after:bg-slate-200'></div>
                            <li className='my-2'>
                                <NavLink
                                    to=""
                                    end
                                    className={({ isActive }) => isActive ? "bg-white text-primary text-lg" : "text-lg"}><i className="bi bi-house-door-fill"></i>ACCUEIL</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                    to="question"
                                    end
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
                            <div className='absolute bottom-1 left-0 flex flex-col justify-center items-center w-full px-4'>
                                <div className='text-left w-full'>
                                    <span className=' text-slate-400'>sondage actif</span>
                                    <h1 className='text-lg '>{activeSurvey(surveys).title}</h1>
                                    <select className="select rounded-none bg-white text-primary my-4 select-sm w-full max-w-xs">
                                        <option disabled selected>Analyser un autre sondage</option>
                                        {
                                            surveys.map((survey,key) => {
                                                return <option key={key} value={survey.id}>{survey.title}</option>
                                            })
                                        }


                                    </select>
                                </div>

                                <div className='divider before:bg-slate-200 after:bg-slate-200'></div>
                                <Form method='Post'>
                                    <button className="btn btn-outline btn-error border-none rounded-none w-full" type='submit'><i className="bi bi-box-arrow-right"></i>Se déconnecter</button>
                                </Form>
                            </div>

                        </ul>

                    </div>
                </div>
                {/* main */}
                <div className='h-full bg-white basis-4/5 overflow-auto'><Outlet/></div>
            </div>
        </>
    );
}

export default AdminLayout;
