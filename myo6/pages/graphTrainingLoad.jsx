import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrainingLoadHistogram = () => {
  const [data, setData] = useState(null);
  const [daysToShow, setDaysToShow] = useState('14');

  useEffect(() => {
    fetch(`https://myo6.duckdns.org/api/${window.location.href.split("=")[1]}/get_training_load_data`)
      .then(response => response.text())
      .then(text => {
        const validJSONString = text.replace(/:\s*NaN/g, ': null');
        return JSON.parse(validJSONString);
      })
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <div>Loading...</div>;

  const filteredData = daysToShow === 'all' ? data : data.slice(-daysToShow);

  const chartData = {
    labels: filteredData.map(item => {
      const date = new Date(item.Date);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
    }),
    datasets: [
      {
        label: 'Daily Training Load',
        data: filteredData.map(item => item['Daily Training load'] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        stack: 'Stack 0',
        yAxisID: 'y',
      },
      {
        label: 'Training Strain',
        data: filteredData.map(item => item['Training Strain'] || 0),
        backgroundColor: 'rgba(153, 0, 255, 0.6)',
        stack: 'Stack 0',
        yAxisID: 'y',
      },
      {
        label: 'Training Monotony',
        data: filteredData.map(item => item['Training Monotony'] || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        yAxisID: 'y1',
        type: 'bar',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Training Load, Training Strain, and Training Monotony',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Training Load & Strain'
        },
        stacked: true,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Training Monotony'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const handleDaysChange = (event) => {
    setDaysToShow(event.target.value);
  };

  return (
    <div>
      <select value={daysToShow} onChange={handleDaysChange}>
        <option value="all">Toutes les données</option>
        <option value="30">30 derniers jours</option>
        <option value="14">14 derniers jours</option>
        <option value="7">7 derniers jours</option>
      </select>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TrainingLoadHistogram;