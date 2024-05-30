import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ComboChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://myo6.duckdns.org/api/10/min_area/weekly_plot');
        const data = await response.json();

        const labels = [
          '23/05',
          '24/05',
          '25/05',
          '26/05',
          '27/05',
          '28/05',
          '29/05',
        ];

        const datasets = [
          {
            type: 'line',
            label: 'Moyenne glissante 7 jours Matin-Assis',
            data: data.sitting_morning.map((item) => item.rolling_mean_7),
            borderColor: 'rgba(255, 99, 0, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
          {
            type: 'line',
            data: data.sitting_morning.map((item) => item.rolling_mean_30),
            borderColor: 'rgba(255, 99, 0, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            showLine: false,
            pointStyle: false,
            fill: false,
          },
          {
            type: 'line',
            legendDisplay: false,
            data: data.sitting_morning.map((item) => item.lower_bound),
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
            data: data.standing_morning.map((item) => item.rolling_mean_7),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'Matin-Assis',
            data: data.sitting_morning.map((item) => item.min_area),
            backgroundColor: 'rgba(0, 162, 235, 0.8)',
            borderColor: 'rgba(0, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Matin-Debout',
            data: data.standing_morning.map((item) => item.min_area),
            backgroundColor: 'rgba(54, 255, 235, 0.8)',
            borderColor: 'rgba(54, 255, 235, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Soir-Assis',
            data: data.sitting_evening.map((item) => item.min_area || 0),
            backgroundColor: 'rgba(54, 162, 0, 0.8)',
            borderColor: 'rgba(54, 162, 0, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Soir-Debout',
            data: data.standing_evening.map((item) => item.min_area || 0),
            backgroundColor: 'rgba(255, 162, 235, 0.8)',
            borderColor: 'rgba(255, 162, 235, 1)',
            borderWidth: 1,
          },
        ];

        setChartData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const labelsToHide = [];
  const options = {
    scales: {
      x: {
        type: 'category',
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Bilan hebdomadaire',
        font: {
          size: 20,
        },
      },
      legend: {
        labels: {
          filter: (item, data) => !labelsToHide.includes(item.text),
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default ComboChart;