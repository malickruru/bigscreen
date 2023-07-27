import React, { useEffect, useState } from 'react';
import MultiChart from '../../Components/Chart/Chart';
import RadarChart from '../../Components/Chart/RadarChart';
import CreateChart from '../../Components/Chart/CreateChart';
import { listQuestion } from '../../Services/Route';

// Ce composant représente la page d'accueil de l'interface d'administration.
export const HomeView = () => {
    const [questionChart, setquestionChart] = useState([]);

    useEffect(() => {
        // si  le premier sondage est actif , afficher les graphiques personnalisés
        if (localStorage.getItem("BigScreenActiveSurvey") == 1) {
            setquestionChart([6, 7, 10, 'radar'])
        } else {
            getQuestions()
            
        }
    }, []);

    const getQuestions = async () => {
        let surveyId = localStorage.getItem("BigScreenActiveSurvey")
        let questionIds = []
        let res = await listQuestion.getResponse({ id: surveyId })
        if (res.success) {
            
            for (let i = 0; i < res.data.length; i++) {
                if (questionIds.length >= 4) {
                    setquestionChart(questionIds)
                    return
                }
                if ( res.data[i].type == 'A' ) {
                    questionIds.push(res.data[i].id) 
                }
            }
            setquestionChart(questionIds)
        }

    }
    return (
        <>
            <h1 className='text-3xl text-slate-200 text-center my-10'>Résultats du sondage</h1>
            <div className='container p-5 mx-auto grid grid-cols-1 md:grid-cols-2  '>
                {
                    questionChart.map((q, key) => {
                        if (q == 'radar') {
                            return <div className='  flex justify-center items-center' key={key}>
                                <RadarChart />
                            </div>
                        }
                        return <div className=' flex justify-center items-center  ' key={key}>
                            <MultiChart id={q} type={'Pie'} />
                        </div>
                    })
                }
            </div>

            <CreateChart />
        </>
    );
}


