import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, TimeScale } from 'chart.js';

import "./Chart.css";

import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

ChartJS.register(LineElement, PointElement, LinearScale, Title, TimeScale);

const PriceIndexChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getPriceIndex');
            const data = response.data;

            const labels = data.map(item => item.Date);
            const datasets = Object.keys(data[0])
                .filter(key => key !== 'Date' && key !== 'wholesale_Price_Index')
                .map(grain => ({
                    label: grain,
                    data: data.map(item => item[grain]),
                }));

            // console.log(datasets)

            setChartData({
                labels,
                datasets,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    return (
        <div className='chart'>
            <h2>Price Index Chart</h2>
            <Line
                data={chartData}
                options={{
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month', // or 'day', 'year', etc. depending on your data
                            },
                            adapters: {
                                date: {
                                    locale: enUS,
                                },
                            }
                        },
                    },
                    label: "bitch",
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(75, 192, 192)'
                }}
            />
        </div>
    );
};

export default PriceIndexChart;
