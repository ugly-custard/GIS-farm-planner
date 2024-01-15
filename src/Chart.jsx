import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const PriceIndexChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
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

                setChartData({
                    labels,
                    datasets,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
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
                        },
                    },
                }}
            />
        </div>
    );
};

export default PriceIndexChart;
