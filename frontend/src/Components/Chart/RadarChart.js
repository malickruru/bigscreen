import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { randomColor } from '../../Utils/Color';
import Error from '../Error';
import { Radar } from 'react-chartjs-2';
import { qualityData } from '../../Services/Route';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChart = () => {
    const [[error, errorMessage], seterror] = useState([false, '']);
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: '',
            borderColor: '',
            borderWidth: 1
        }]
    });


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setloading(true)
        let res = await qualityData.getResponse()
        if (!res.success) {
            setloading(false)
            seterror([true, res.message]);
            return
        }
        let color = randomColor(0.8)
        setdata(
            {
                labels: res.data.label,
                datasets: [{
                    label: 'Qualité',
                    data: res.data.data,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1
                }]
            }
        )

        setloading(false)
    }

    if (error) {
        return <Error message={errorMessage} postion={['']} />
    } else if (loading) {
        return <div className='flex flex-col w-10/12 h-64 justify-center items-center my-8'>
            <span className="loading loading-spinner loading-lg bg-primary"></span>
        </div>
    } else {
        return <div className='flex flex-col w-11/12 text-center my-8'>
            <h1 className='text-lg text-slate-200 py-3'>Qualité de l'application</h1>
            <Radar
                data={data}
                options={
                    {
                        scale: {
                            min: 0,
                            max: 5,
                            
                        },
                        color : "#fff",
                        scales : {
                            r: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                ticks: {
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    backdropColor: 'rgba(255, 255, 255, 0)'
                                },
                                pointLabels:{
                                    color: '#fff',
                                },
                                
                                
                            }
                        }

                    }
                } />
        </div>
    }
}

export default RadarChart;
