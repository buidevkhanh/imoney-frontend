import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export default function BarChart(props) {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Report for ${props.type} transactions`,
            },
            },
        };
        const labels= props.label;
        const data  = {
            labels,
            datasets: [
                {
                    label: 'transfer',
                    data: props.data.transfer,
                    backgroundColor: '#F28080'
                },
                {
                    label: 'receive',
                    data: props.data.receive,
                    backgroundColor: '#84DCD4'
                }
            ]
        }

        return (
            <Bar style={{backgroundColor: 'white', padding: '20px 15px'}} options={options} data={data} />
        )
}
