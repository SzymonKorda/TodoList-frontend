import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";

const PieChart = (props) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const options = {
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        responsive: true
    }


    const data = {
        labels: ['Active', 'Finished'],
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
        <Pie options={options} data={data}/>
    );
};

export default PieChart;
