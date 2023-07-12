import React from 'react';
import MultiChart from '../../Components/Chart/Chart';
import RadarChart from '../../Components/Chart/RadarChart';
import CreateChart from '../../Components/Chart/CreateChart';

export const HomeView = () => {
    return (
        <>
            {
            localStorage.getItem("BigScreenActiveSurvey") == 1 
            && 
            <div className='container p-5 mx-auto grid grid-cols-2  '>
                <div className='relative flex justify-center items-center '>
                    <MultiChart id={6} type={'Pie'}/>
                </div>
                <div className='relative flex justify-center items-center'>
                    <MultiChart id={7} type={'Pie'}/>
                </div>
                <div className='relative flex justify-center items-center'>
                    <MultiChart id={10} type={'Pie'}/>
                </div>
                <div className='relative flex justify-center items-center'>
                    <RadarChart/>
                </div>
                
            </div>
            }
            <CreateChart/>
        </>
    );
}


