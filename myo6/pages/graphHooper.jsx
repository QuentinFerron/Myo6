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
      text: 'Score Personnalisé',
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
    fetch(baseUrl + 'api/getSpecificUserHooper?id_user=' + window.location.href.split("=")[1])
      .then(response => response.json())
      .then(data => setData(data));
 }, []);


// Préparation des données pour le graphique
//  const labels = data.map(item => item.Date);
//  const atlData = data.map(item => item.ATL);

 const chartData = {
    // labels: labels,
    labels: data.map((item) => new Date(item.Date).toLocaleDateString()), // Format dates for labels
    datasets: [
      {
        label: 'Hooper',
        // data: atlData,
        data: data.map(item => item.hooper_index),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        spanGaps: true,
      },
    ],
 };

 return (
  <>
    <div>
      <Line data={chartData} options={options}/>
    </div>
    </>
 )
}
export async function getServerSideProps() {
  // fetch env.local variables named DEBUG_MODE
console.log(process.env.DEBUG_MODE);
  return {
    props: { DEBUG_MODE: process.env.DEBUG_MODE },
  };
}