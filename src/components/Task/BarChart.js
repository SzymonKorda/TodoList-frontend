import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        fontStyle: 'bold',
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
        },
    };

    const labels = ['Active', 'Finished'];

     const data = {
        labels,
         datasets: [
             {
                 data: [props.activeCount, props.finishedCount],
                 backgroundColor: [
                     "#d6d43b",
                     "#138c0d",
                 ],
                 borderWidth: 1,
             },
         ],
    };

    return (
        <Bar options={options} data={data} />
    );
}

export default BarChart;
