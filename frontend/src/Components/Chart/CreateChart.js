import React, { useEffect, useRef, useState } from 'react';
import MultiChart from './Chart';
import { listQuestion } from '../../Services/Route';


// Ce composant permet de créer un chart 

const CreateChart = () => {
    const [questions, setquestion] = useState([]);
    const [loading, setloading] = useState(false);
    const [[id,type], setchartData] = useState(['','']);
    const types = ['Pie','Doughnut','VerticalBar','HorizontalBar','PolarArea'];

    const selectYarstick = useRef(null)
    const selectType = useRef(null)

    const handleClick = () => {
        setchartData([selectYarstick.current.value,selectType.current.value])
    }

    const getQuestion = async () => {
        setloading(true)
        let res = await listQuestion.getResponse({id : localStorage.getItem("BigScreenActiveSurvey") })
        if (!res.success) {
            return null
        }
        setquestion(res.data)
        setloading(false)
    }

    useEffect(() => {
        // récupérer les questions du sondage lorsque le composant est monté
        getQuestion()
    }, []);


    return (
        <div className='container p-5 mx-auto flex flex-col justify-center items-center '>
            <h1 className='text-3xl text-slate-200 text-center mb-10'>Générer un graphique</h1>
            <div className='flex flex-col md:flex-row justify-around md:items-end w-full '>
                {/* critere */}
                <div className='my-3'>
                    <label className="label">
                        <span className="label-text text-slate-200">Choisir un critère à étudier</span>
                    </label>
                    <select ref={selectYarstick} className="select rounded-none bg-slate-200 text-black  select-sm w-full max-w-xs">
                        <option disabled selected value={''}>Choisir un critère à étudier</option>
                        {
                            loading ? <div><span className="loading loading-spinner loading-md bg-primary"></span></div> :
                            questions.map((question, key) => {
                                if (question.type == 'A') {
                                    return <option key={key} value={question.id}>{question.yardstick}</option>
                                }
                                
                            })
                        }
                    </select>
                </div>
                {/* type de chart */}
                <div className='my-3'>
                    <label className="label">
                        <span className="label-text text-slate-200">Choisir un type de graphique</span>
                    </label>
                    <select ref={selectType} className="select rounded-none bg-slate-200 text-black  select-sm w-full max-w-xs">
                        <option disabled selected value={''}>Choisir un type de graphe</option>
                        {
                            types.map((type, key) => {
                                return <option key={key} value={type}>{type}</option>                               
                            })
                        }
                    </select>
                </div>
                
                <button onClick={handleClick} class="btn my-3 bg-slate-200 text-black hover:bg-slate-200 hover:scale-95 btn-sm rounded-none">Générer le graphique</button>
            </div>
            {
                (id && type) 
                &&
                <div className='w-full md:w-2/3'>
                    <MultiChart id={id} type={type} key={id+type}/>
                </div> 
            }
        </div>
    );
}

export default CreateChart;
