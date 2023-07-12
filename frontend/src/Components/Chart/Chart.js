import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import { AtypeData } from '../../Services/Route';
import Error from '../Error';
import { randomColorArray } from '../../Utils/Color';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale, RadialLinearScale } from 'chart.js';


ChartJS.register(ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    RadialLinearScale
);


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
    useEffect(() => {
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
        let colors = randomColorArray(res.data.data.length, 0.2)
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
                        <h1 className='text-lg text-black py-3'>{title}</h1>
                        <Doughnut
                            data={data}
                        />
                    </div>
                )
            case 'VerticalBar':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-lg text-black py-3'>{title}</h1>
                        <Bar
                            data={data}
                        />
                    </div>
                )
            case 'HorizontalBar':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-lg text-black py-3'>{title}</h1>
                        <Bar
                            data={data}
                            options={{
                                indexAxis: 'y',
                            }}
                        />
                    </div>
                )
            case 'PolarArea':
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-lg text-black py-3'>{title}</h1>
                        <PolarArea
                            data={data}
                        />
                    </div>
                )
            default:
                return (
                    <div className='flex flex-col w-10/12 text-center my-8'>
                        <h1 className='text-lg text-black py-3'>{title}</h1>
                        <Pie
                            data={data}
                        />
                    </div>

                )
        }
    }
}
export default MultiChart;
