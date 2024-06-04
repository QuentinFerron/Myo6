import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ComboChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('min_area');
  const [idUser, setIdUser] = useState(null);
  const [error, setError] = useState(null); // Nouvelle variable d'état pour gérer les erreurs

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.location.href.split("=")[1] === undefined) {
          setError('Aucun utilisateur spécifié'); // Aucun utilisateur spécifié
          return;
        }
        setIdUser(window.location.href.split("=")[1]);

        const response = await fetch(`https://myo6.duckdns.org/api/${idUser}/${selectedOption}/weekly_plot`);

        if (!response.ok) {
          setError('Pas de données'); // Lien invalide
          return;
        }

        const data = await response.json();

        const dates = new Set();
        for (const section of Object.values(data)) {
          for (const item of section) {
            dates.add(new Date(item.Date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));
          }
        }
        // const labels = Array.from(dates).sort();
        const labels = Array.from(dates);


        const datasets = [
          {
            type: 'line',
            label: 'Moyenne glissante 7 jours Matin-Assis',
            data: data.sitting_morning.map((item) => item.rolling_mean_7),
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 1)',
            spanGaps: true,
            tension: 0.3,
            pointRadius: 2,
            fill: false,
          },
          {
            type: 'line',
            label: 'Moyenne glissante 7 jours Matin-Debout',
            data: data.standing_morning.map((item) => item.rolling_mean_7),
            borderColor: 'rgba(132, 0, 255, 1)',
            backgroundColor: 'rgba(132, 0, 255, 1)',
            spanGaps: true,
            tension: 0.3,
            pointRadius: 2,
            fill: false,
          },
          {
            type: 'line',
            label: 'Baseline 30 jours Matin-Assis',
            data: data.sitting_morning.map((item) => item.rolling_mean_30),
            borderColor: 'rgba(255, 153, 153, 0)',
            backgroundColor: 'rgba(255, 153, 153, 0.5)',
            showLine: false,
            pointStyle: false,
            spanGaps: true,
            fill: false,
          },
          {
            type: 'line',
            legendDisplay: false,
            data: data.sitting_morning.map((item) => item.lower_bound),
            borderColor: 'rgba(255, 153, 153, 0)',
            backgroundColor: 'rgba(255, 153, 153, 0.5)',
            borderWidth: 0.1,
            showLine: false,
            pointStyle: false,
            spanGaps: true,
            fill: +1,
          },
          {
            type: 'line',
            label: 'Baseline 30 jours Matin-Debout',
            data: data.standing_morning.map((item) => item.rolling_mean_30),
            borderColor: 'rgba(255, 153, 255, 0)',
            backgroundColor: 'rgba(255, 153, 255, 0.3)',
            showLine: false,
            pointStyle: false,
            spanGaps: true,
            fill: false,
          },
          {
            type: 'line',
            data: data.standing_morning.map((item) => item.lower_bound),
            borderColor: 'rgba(255, 153, 255, 0)',
            backgroundColor: 'rgba(255, 153, 255, 0.3)',
            borderWidth: 0.1,
            showLine: false,
            pointStyle: false,
            spanGaps: true,
            fill: +1,
          },
          {
            type: 'bar',
            label: 'Matin-Assis',
            data: data.sitting_morning.map((item) => item[selectedOption]),
            backgroundColor: 'rgba(0, 162, 235, 0.8)',
            borderColor: 'rgba(0, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Matin-Debout',
            data: data.standing_morning.map((item) => item[selectedOption]),
            backgroundColor: 'rgba(54, 255, 235, 0.8)',
            borderColor: 'rgba(54, 255, 235, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Soir-Assis',
            data: data.sitting_evening.map((item) => item[selectedOption] || 0),
            backgroundColor: 'rgba(54, 162, 0, 0.8)',
            borderColor: 'rgba(54, 162, 0, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: 'Soir-Debout',
            data: data.standing_evening.map((item) => item[selectedOption] || 0),
            backgroundColor: 'rgba(50, 255, 50, 0.8)',
            borderColor: 'rgba(50, 255, 50, 1)',
            borderWidth: 1,
          },
        ];

        setChartData({
          labels,
          datasets,
        });
        setError(null); // Réinitialiser l'erreur si les données ont été récupérées avec succès
      } catch (error) {
        setError('Erreur lors de la récupération des données'); // Erreur lors de la récupération des données
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [selectedOption, idUser]);

  const labelsToHide = [,];
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
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="min_area">Aire minimale</option>
        <option value="max_area">Aire maximale</option>
        <option value="difference_area">Différence d&apos;aire</option>
        <option value="reaction_time">Temps de réaction</option>
        <option value="time_constriction">Temps de constriction</option>
        <option value="average_half_recovery_velocity">Vitesse moyenne de demi-récupération</option>
        <option value="average_constriction_velocity_area">Vitesse moyenne de constriction</option>
        <option value="max_constriction_velocity_area">Vitesse maximale de constriction</option>
      </select>
      {error ? (
        <p>{error}</p> // Afficher le message d'erreur si une erreur est présente
      ) : chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Chargement des données...</p> // Afficher un message de chargement si les données ne sont pas encore disponibles
      )}
    </div>
  );
};

export default ComboChart;