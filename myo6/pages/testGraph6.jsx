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
      
    // y: {
      // ticks: {
      //   beginAtZero: true,
      //   callback: function(value, index, values) {
      //     return (index === 2) ? "0" : null;
      //   }
      // },
    //   grid: {
    //     color: 'blue',
    //   },
    //   title: {
    //     display: true,
    //     text: 'Load',
    //   },
    // },
    // y2: {
    //        ticks: {
    //      beginAtZero: true,
    //      callback: function(value, index, values) {
    //        return (index === 2) ? "0" : null;
    //      }
    //    },
      // max: 100,
      // min: 0,
      // ticks: {
      //   display: false,
      //   stepSize: 1,
      // },
      // grid: {
      //   drawTicks: false,
      //   drawBorder: false,
      //   color: 'rgba(255, 0, 255, 1)'
      // }
    },
  },
};

const GraphiqueATL = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
    fetch('http://localhost:3000/api/getSpecificUserLoad?id_user=' + window.location.href.split("=")[1])
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
        label: 'ATL',
        // data: atlData,
        data: data.map(item => item.ATL),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'CTL',
        // data: atlData,
        data: data.map(item => item.CTL),
        fill: false,
        backgroundColor: 'rgb(0, 192, 0)',
        borderColor: 'rgba(75, 192, 0, 0.8)',
      },
      {
        label: 'TSB',
        // data: atlData,
        data: data.map(item => item.TSB),
        fill: false,
        backgroundColor: 'rgb(0, 0, 192)',
        borderColor: 'rgba(0, 0, 192, 0.8)',
      },
        // {
        //   label: '',
        //   // data: atlData,
        //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //   fill: true,
        //   backgroundColor: 'rgb(1, 1, 1, 0)',
          
        //   borderColor: 'rgba(0, 0, 0, 1)',
        // },
    ],
 };

 return (
    <div>
      <Line data={chartData} options={options}/>
    </div>
 );
};

export default GraphiqueATL;
