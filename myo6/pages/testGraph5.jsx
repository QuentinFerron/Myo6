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

const GraphiqueATL = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
    fetch('http://localhost:3000/api/getSpecificUserLoadTest')
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
    ],
 };

 return (
    <div>
      <Line data={chartData} options={{
          plugins: {
            title: {
              display: true,
              text: 'Training Load',
              font: {
                size: 20,
              },
            },
          },
        }}/>
    </div>
 );
};

export default GraphiqueATL;
