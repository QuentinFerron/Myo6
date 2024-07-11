import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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


  const [options, setOptions] = useState({
    responsive: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Training Monotony and Strain',
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
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  });


useEffect(() => {
  if (typeof window !== 'undefined') {
    const handleResize = () => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        aspectRatio: window.innerWidth < 768 ? 1.25 : 2,
      }));
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Appeler la fonction une fois pour définir l'aspect ratio initial

    return () => window.removeEventListener('resize', handleResize);
  }
}, []);


 const [data, setData] = useState([]);

 useEffect(() => {
    fetch(baseUrl + 'api/getSpecificUserLoad?id_user=' + window.location.href.split("=")[1])
      .then(response => response.json())
      .then(data => setData(data));
 }, []);


 const chartData = {
  labels: data.map(item => {
    const date = new Date(item.Date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
  }),
  datasets: [
    {
      type: 'bar',
      label: 'Training Monotony',
      data: data.map(item => item['Training Monotony']),
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
    },
    {
      type: 'bar',
      label: 'Training Strain',
      data: data.map(item => item['Training Strain']),
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    },
  ],
};

 return (
  <div>
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
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
