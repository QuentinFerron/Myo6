import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home(props) {

  let baseUrl = "s";
  if (props.DEBUG_MODE === 'true') {
    baseUrl = "http://localhost:3000/";
    console.log("DEBUG_MODE");
  } else {
    baseUrl = "https://myo6.vercel.app/";
    console.log(baseUrl);
  }


const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Training Load',
      font: {
        size: 20,
      },
    },
    legend: {
      position: 'top',
    },
  },
  scales: {

    x: {
      
      title: {
        display: true,
        // text: 'Date',
      },
    },
    
      y: {
        type: 'linear',
        display: true,
        position: 'left',

      },
      y1: {
        ticks: {
             beginAtZero: true,
             callback: function(value, index, values) {
               return (index === 2) ? "" : null;
             },
            },
        type: 'linear',
        display: true,
        position: 'right',
        


        // grid line settings
        grid: {
          drawOnChartArea: true, // only want the grid lines for one axis to show up
        },
    },
  },
};


 const [data, setData] = useState([]);

 useEffect(() => {
    fetch(baseUrl + 'api/getSpecificUserLoad?id_user=' + window.location.href.split("=")[1])
      .then(response => response.json())
      .then(data => setData(data));
 }, []);


 const chartData = {
    // labels: labels,
    // labels: data.map((item) => new Date(item.Date).toLocaleDateString()), // Format dates for labels
    labels: data.map(item => {
      const date = new Date(item.Date);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
    }),
    datasets: [
      {
        label: 'ATL',
        // data: atlData,
        data: data.map(item => item.ATL),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        tension: 0.3,
        pointRadius: 1.5,
      },
      {
        label: 'CTL',
        // data: atlData,
        data: data.map(item => item.CTL),
        fill: false,
        backgroundColor: 'rgb(0, 192, 0)',
        borderColor: 'rgba(75, 192, 0, 0.8)',
        tension: 0.3,
        pointRadius: 1.5,
      },
      {
        label: 'TSB',
        // data: atlData,
        data: data.map(item => item.TSB),
        fill: false,
        backgroundColor: 'rgb(0, 0, 192)',
        borderColor: 'rgba(0, 0, 192, 0.8)',
        tension: 0.3,
        pointRadius: 1.5,
      },
    ],
 };

 return (
    <div>
      <Line data={chartData} options={options}/>
    </div>
 );
}
export async function getServerSideProps() {
  // fetch env.local variables named DEBUG_MODE
console.log(process.env.DEBUG_MODE);
  return {
    props: { DEBUG_MODE: process.env.DEBUG_MODE },
  };
}
