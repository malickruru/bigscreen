import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import { AtypeData } from '../../Services/Route';
import Error from '../Error';
import { randomColorArray } from '../../Utils/Color';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale, RadialLinearScale, scales } from 'chart.js';


ChartJS.register(ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    RadialLinearScale
);

// Ce composant retourne un graphique en fonction du type passé en prop

const MultiChart = ({ id, type }) => {
    const [[error, errorMessage], seterror] = useState([false, '']);
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    });
    const [title, settitle] = useState('');
    const colorOption = {
        color: "#fff",
    }
    useEffect(() => {
        // récupérer les données du graphe lorsque le composant est monté
        fetchData();
    }, []);

    const fetchData = async () => {
        setloading(true)
        let res = await AtypeData.getResponse({ id: id })

        if (!res.success) {
            setloading(false)
            seterror([true, res.message]);
            return
        }
        let colors = randomColorArray(res.data.data.length, 0.8)
        setdata(
            {
                labels: res.data.labels,
                datasets: [{
                    label: res.data.title,
                    data: res.data.data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            }
        )
        settitle(res.data.title)
        setloading(false)
    }

    if (error) {
        return <Error message={errorMessage} postion={['']} />
    } else if (loading) {
        return <div className='flex flex-col w-10/12 h-64 justify-center items-center my-8'>
            <span className="loading loading-spinner loading-lg bg-primary"></span>
        </div>
    } else {
        switch (type) {
            case 'Doughnut':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-xl  font-bold text-slate-200 py-3'>{title}</h1>
                        <Doughnut
                            data={data}
                            options={
                                colorOption
                            }
                        />
                    </div>
                )
            case 'VerticalBar':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-xl  font-bold text-slate-200 py-3'>{title}</h1>
                        <Bar
                            data={data}
                            options={
                                {
                                    ...colorOption,
                                    elements : {
                                        bar : {
                                            borderRadius : {
                                                topRight : 10,
                                                topLeft : 10,
                                            },
                                        }
                                    }
                                    ,scales : {
                                        x : {
                                            grid : {
                                                color : 'rgba(255, 255, 255, 0.3)'
                                            },
                                            ticks :{
                                                color : '#fff'
                                            }
                                        },
                                        y : {
                                            grid : {
                                                color : 'rgba(255, 255, 255, 0.3)'
                                            },
                                            ticks :{
                                                color : '#fff'
                                            }
                                        },
                                    }
                                }
                            }
                        />
                    </div>
                )
            case 'HorizontalBar':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-xl  font-bold text-slate-200 py-3'>{title}</h1>
                        <Bar
                            data={data}
                            options={{
                                indexAxis: 'y',
                                ...colorOption,
                                elements : {
                                    bar : {
                                        borderRadius : {
                                            topRight : 10,
                                            bottomRight : 10,
                                        },
                                    }
                                }
                                ,scales : {
                                    x : {
                                        grid : {
                                            color : 'rgba(255, 255, 255, 0.3)'
                                        },
                                        ticks :{
                                            color : '#fff'
                                        }
                                    },
                                    y : {
                                        grid : {
                                            color : 'rgba(255, 255, 255, 0.3)'
                                        },
                                        ticks :{
                                            color : '#fff'
                                        }
                                    },
                                }
                                }}
                        />
                    </div>
                )
            case 'PolarArea':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-xl  font-bold text-slate-200 py-3'>{title}</h1>
                        <PolarArea
                            data={data}
                            options={
                                {
                                    ...colorOption,
                                    scales : {
                                        r : {
                                            grid : {
                                                color : 'rgba(255, 255, 255, 0.3)'
                                            },ticks :{
                                                color : '#fff',
                                                backdropColor : 'rgba(255, 255, 255, 0)'

                                            }
                                        },

                                    }
                                }
                            }
                        />
                    </div>
                )
            default:
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-xl  font-bold text-slate-200 py-3'>{title}</h1>
                        <Pie
                            data={data}
                            options={
                                colorOption
                            }
                        />
                    </div>

                )
        }
    }
}
export default MultiChart;
