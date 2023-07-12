import React, { useEffect, useRef, useState } from 'react';
import MultiChart from './Chart';
import { listQuestion } from '../../Services/Route';

const CreateChart = () => {
    const [questions, setquestion] = useState([]);
    const [loading, setloading] = useState(false);
    const [[id,type], setchartData] = useState(['','']);
    const types = ['Pie','Doughnut','VerticalBar','HorizontalBar','PolarArea'];

    const selectYarstick = useRef(null)
    const selectType = useRef(null)

    const handleClick = () => {
        console.log([selectYarstick.current.value,selectType.current.value]);
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
        getQuestion()
    }, []);


    return (
        <div className='container p-5 mx-auto flex flex-col justify-center items-center '>
            <h1 className='text-3xl text-black text-center mb-10'>Générer un graphique</h1>
            <div className='flex justify-around items-end w-full'>
                {/* critere */}
                <div>
                    <label className="label">
                        <span className="label-text text-black">Choisir un critère à étudier</span>
                    </label>
                    <select ref={selectYarstick} className="select rounded-none bg-primary text-white  select-sm w-full max-w-xs">
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
                <div>
                    <label className="label">
                        <span className="label-text text-black">Choisir un type de graphique</span>
                    </label>
                    <select ref={selectType} className="select rounded-none bg-primary text-white  select-sm w-full max-w-xs">
                        <option disabled selected value={''}>Choisir un type de graphe</option>
                        {
                            types.map((type, key) => {
                                return <option key={key} value={type}>{type}</option>                               
                            })
                        }
                    </select>
                </div>
                
                <button onClick={handleClick} class="btn btn-primary btn-sm rounded-none">Générer le graphique</button>
                
                

            </div>
            {
                (id && type) 
                &&
                <div className='w-2/3'>
                    <MultiChart id={id} type={type} key={id+type}/>
                </div> 
            }
        </div>
    );
}

export default CreateChart;
