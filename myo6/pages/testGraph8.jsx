import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = {
  labels: ['20/05', '21/05', '22/05', '23/05', '24/05', '25/05', '26/05'],
  datasets: [
    {
      type: 'line',
      label: 'Moyenne glissante 7 jours Matin-Assis',
      data: [50, 60, 70, 80, 65, 75, 85],
      borderColor: 'rgba(255, 99, 0, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: false,
    },
    {
      type: 'line',
      data: [55, 64, 54, 60, 63, 50, 56],
      borderColor: 'rgba(255, 99, 0, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      showLine: false,
      pointStyle: false,
      fill: false,
    },
    {
      type: 'line',
      legendDisplay: false,
      data: [46, 56, 46, 52, 57, 42, 49],
      borderColor: 'rgba(255, 99, 255, 0.1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 0.1, 
      showLine: false,
      pointStyle: false,
      fill: +1,
    },
    {
      type: 'line',
      label: 'Moyenne glissante 7 jours Matin-Debout',
      data: [40, 50, 80, 90, 55, 35, 55],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: false,
    },
    {
      type: 'bar',
      label: 'Matin-Assis',
      data: [30, 45, 60, 75, 50, 65, 80],
      backgroundColor: 'rgba(0, 162, 235, 0.8)',
      borderColor: 'rgba(0, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      type: 'bar',
      label: 'Matin-Debout',
      data: [25, 40, 55, 70, 45, 60, 85],
      backgroundColor: 'rgba(54, 255, 235, 0.8)',
      borderColor: 'rgba(54, 255, 235, 1)',
      borderWidth: 1,
    },
    {
      type: 'bar',
      label: 'Soir-Assis',
      data: [47, 68, 22, 12, 87, 34, 90],
      backgroundColor: 'rgba(54, 162, 0, 0.8)',
      borderColor: 'rgba(54, 162, 0, 1)',
      borderWidth: 1,
    },
    {
      type: 'bar',
      label: 'Soir-Debout',
      data: [35, 50, 65, 80, 55, 70, 85],
      backgroundColor: 'rgba(255, 162, 235, 0.8)',
      borderColor: 'rgba(255, 162, 235, 1)',
      borderWidth: 1,
    },

  ],
};
const labelsToHide = [,];

const options = {
  scales: {
    x: {
      type: 'category',
    },
  },
  plugins: {
    legend: {
      labels: {
        filter: (item, data) => !labelsToHide.includes(item.text),
      },
    },
  },
};

const ComboChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const resizeChart = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', resizeChart);
    resizeChart(); // Redimensionner le graphique lors du premier rendu

    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  return (
    <div style={{ width: '55%', height: '55%' }}>
      <Bar data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default ComboChart;