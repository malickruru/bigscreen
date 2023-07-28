import React, { useEffect, useState } from 'react';
import { Form, NavLink, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as BigScreenLogo } from '../Assets/Images/BigScreenLogo.svg';
import { activeSurvey } from '../Utils/ActiveSurvey';
import { onlineSurvey } from '../Services/Route';


// Le composant AdminLayout représente le layout (mise en page) de l'interface administrateur. Il est conçu pour être utilisé comme conteneur pour les pages de l'application côté administrateur.
const AdminLayout = () => {
    // objet sondage 

    const [surveys, setSurveys] = useState([]);
    const [loadingsurveys, setloadingSurveys] = useState(false);

    useEffect(() => {
        getSurveys()
    }, []);

    // récupérer les surveys
    const getSurveys = async () => {
        setloadingSurveys(true)
        let res = await onlineSurvey.getResponse()
        setSurveys(res.data)
        setloadingSurveys(false)
    }

    // déstructurer l'objet location est récupérer pathname qui correspond à l'url
    const location = useLocation();
    const { hash, pathname, search } = location

    return (
        <>
            {/* drawer */}
            <div className='h-screen flex flex-row relative'>
                <div className="drawer  fixed md:relative  md:basis-1/5  lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-start justify-center bg-transparent  ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="btn bg-[#111827] text-2xl border-none  lg:hidden "><i class="bi bi-list"></i></label>

                    </div>
                    <div className="drawer-side z-30">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu z-40 p-4 w-80 h-full bg-gray-800 relative ">
                            {/* Sidebar content here */}
                            <div className='flex justify-center'>
                                <BigScreenLogo fill="#fff" width={250} />
                            </div>
                            <div className='divider before:bg-slate-200 after:bg-slate-200'></div>
                            <li className='my-2'>
                                <NavLink
                                    to=""
                                    end
                                    className={({ isActive }) => isActive ? "bg-slate-200 text-base-100 text-lg" : "text-lg"}><i className="bi bi-house-door-fill"></i>ACCUEIL</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                    to="questions"
                                    end
                                    className={({ isActive }) => isActive ? "bg-slate-200 text-base-100 text-lg" : "text-lg"}><i className="bi bi-question-square-fill"></i>QUESTIONS</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                    to="responses/1"
                                    className={({ isActive }) => isActive || pathname.includes('responses') ? "bg-slate-200 text-base-100 text-lg" : "text-lg"}><i className="bi bi-list-check"></i>REPONSES</NavLink>
                            </li>
                            <li className='my-2'>
                                <NavLink
                                    to="surveys"
                                    end
                                    className={({ isActive }) => isActive ? "bg-slate-200 text-base-100 text-lg" : "text-lg"}><i className="bi bi-folder-fill"></i>SONDAGES</NavLink>
                            </li>
                            <div className='absolute bottom-1 left-0 flex flex-col justify-center items-center w-full px-4'>
                                <div className='text-left w-full'>
                                    <span className=' text-slate-400'>sondage actif</span>
                                    <h1 className='text-lg '>{activeSurvey(surveys).title}</h1>
                                    <select onChange={(e) => {
                                        // changer de façon global le sondage analisé
                                        localStorage.setItem("BigScreenActiveSurvey", e.target.value)
                                        window.location.reload()
                                    }} onClick={getSurveys}
                                        className="select rounded-none  bg-slate-200 text-base-100 my-4 select-sm w-full max-w-xs">
                                        <option disabled selected>Analyser un autre sondage</option>
                                         
                                        {
                                            loadingsurveys ? <option disabled ><span className='animate-pulse'>chargement...</span></option>  :
                                                surveys.map((survey, key) => {
                                                    return <option key={key} value={survey.id}>{survey.title}</option>
                                                })
                                        }


                                    </select>
                                </div>

                                <div className='divider before:bg-slate-200 after:bg-slate-200'></div>
                                <Form method='Post'>
                                    <button className="btn btn-outline text-red-700  hover:bg-red-800 hover:text-white border-none rounded-none w-full" type='submit'><i className="bi bi-box-arrow-right"></i>Se déconnecter</button>
                                </Form>
                            </div>

                        </ul>

                    </div>
                </div>
                {/* main */}
                <div className='h-full bg-[#111827] basis-full md:basis-4/5 overflow-auto'><Outlet /></div>
            </div>
        </>
    );
}

export default AdminLayout;
