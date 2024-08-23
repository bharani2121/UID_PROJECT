import { useState, useEffect } from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

export default function DoughnutChart(props) {
    const [data, setData] = useState({});

    useEffect(() => {
        setData({
            labels: props.labels,
            datasets: [{
                label: 'My First Dataset',
                data: props.data,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        });
    },[props])

    return (
        Object.keys(data).length !== 0 &&  <Chart type='doughnut' data={data} />
    )
}