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

  const [daysToShow, setDaysToShow] = useState('30');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  useEffect(() => {
    fetch(baseUrl + 'api/getSpecificUserHooper?id_user=' + window.location.href.split("=")[1])
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredData = daysToShow === 'all' ? data : data.slice(-daysToShow);

  const allHooperValuesZeroOrNull = filteredData.every(item => item.prs_100 === 0 || item.prs_100 === null);

  const chartData = {
    labels: filteredData.map(item => {
      const date = new Date(item.Date);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
    }),
    datasets: [
      {
        label: 'Hooper',
        data: filteredData.map(item => item.prs_100),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        spanGaps: true,
        tension: 0.2,
        pointRadius: 1.5,
      },
    ],
  };

  const handleDaysChange = (event) => {
    setDaysToShow(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || data.length === 0 || allHooperValuesZeroOrNull) {
    return <div>Pas de données</div>;
  }

  return (
    <>
      <div>
        <select value={daysToShow} onChange={handleDaysChange}>
          <option value="all">Toutes les données</option>
          <option value="30">30 derniers jours</option>
          <option value="14">14 derniers jours</option>
          <option value="7">7 derniers jours</option>
        </select>
        <Line data={chartData} options={options} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  console.log(process.env.DEBUG_MODE);
  return {
    props: { DEBUG_MODE: process.env.DEBUG_MODE },
  };
}
