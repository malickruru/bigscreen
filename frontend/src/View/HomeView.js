import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FormatedDate } from '../Utils/Date';

const HomeView = () => {
    const surveys = useLoaderData();
    
    return (
        <div className="container mx-auto p-5 mt-14 flex justify-center items-center flex-col h-screen relative">
            {surveys.map((survey,key) => {
                return <div className="card w-1/2 bg-base-100 shadow-xl" key={key}>
                    <div className="card-body">
                        <h2 className="card-title">{survey.title}</h2>
                        <p>{survey.description}</p>
                        <span className=' italic text-base-content'>{ FormatedDate(survey.created_at) }</span>
                        <div className="card-actions justify-end">
                            <Link to={'/survey/'+survey.id} className="btn bg-white text-base-100 hover:bg-white hover:scale-90">Répondre maintenant</Link >
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
}

export default HomeView;
