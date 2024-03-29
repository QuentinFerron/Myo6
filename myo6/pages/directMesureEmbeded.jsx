import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Line as LineJS } from 'chart.js/auto'
//import styles from '@/styles/Home.module.css'

export default function Home(props) {

  let baseUrl = "s";
  if (props.DEBUG_MODE === 'true') {
    baseUrl = "http://localhost:3000/";
    console.log("DEBUG_MODE");
  } else {
    baseUrl = "https://myo6.vercel.app/";
    console.log(baseUrl);
  }


  const [video, setVideo] = useState({});
  const [date , setDate] = useState("");

  const [videoid, setVideoId] = useState();
  const [urlVideo , setUrlVideo] = useState("");
  const [urlVideoo , setUrlVideoo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [area, setArea] = useState([]);
  const [showDiv, setShowDiv] = useState(false);




  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'eye_area',
        data: [],
        borderColor: 'rgba(107,   114,   128,   1)',
        backgroundColor: 'rgba(0,   113,   143,   1)',
      },
    ],
  });


  // Options de configuration du graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Aire de la pupille',
      },
    },
    scales: {
      y: {
        min:   0, // Valeur minimale
        // max:   Math.max(...data.map(item => item.area),), // Valeur maximale
        suggestedMax: 40,
        // max:   50, // Valeur maximale
      },
      x: {
        min:   0, // Valeur minimale
        max:   270, // Valeur maximale
      },
      
    },
    animation: {
      duration:  0, // Durée de l'animation pour chaque point
    },
  };


  useEffect(() => {
    // Mettre en place un délai de 10 secondes avant d'afficher la div
    const timer = setTimeout(() => {
      setShowDiv(true);
    }, 10000);

    // Nettoyer le timer pour éviter les fuites de mémoire
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

    if (window.location.href.split("=")[1] == undefined) {
  
      } else {
        setVideoId(window.location.href.split("=")[1]);
        // setUrlVideo('http://141.145.200.146:5000/api/video/' + videoid + '/video_traitement.mp4');
        // setUrlVideoo('http://141.145.200.146:5000/api/video/'+ window.location.href.split("=")[1] + '/video_traitement.mp4');
      }

    }, []);

    useEffect(() => {


    async function getMyVideos() {
      console.log(videoid);
      const res = await fetch(baseUrl + 'api/getSpecificVideo?id_video=' + window.location.href.split("=")[1], {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      var jsonString = JSON.stringify(data.video_data.pupil_track.area);
      var trimmedString = jsonString.slice(0, -1);
      var area = trimmedString.split(",");
      setUrlVideoo('http://141.145.200.146:5000/api/video/'+ window.location.href.split("=")[1] + '/video_traitement.mp4');
      setUrlVideo('http://141.145.200.146:5000/api/video/' + videoid + '/video_traitement.mp4');

      for (var i =   0; i < area.length; i++) {
        area[i] = parseFloat(area[i]);
      }

      setArea(area);
      setVideo(data.video_data);
      var MyDate = data.video_data.date_record
      MyDate = MyDate.toString().substring(5, MyDate.length - 7);
      MyDate = MyDate.toString().replace(" Jan ", "/01/");
      MyDate = MyDate.toString().replace(" Feb ", "/02/");
      MyDate = MyDate.toString().replace(" Mar ", "/03/");
      MyDate = MyDate.toString().replace(" Apr ", "/04/");
      MyDate = MyDate.toString().replace(" May ", "/05/");
      MyDate = MyDate.toString().replace(" Jun ", "/06/");
      MyDate = MyDate.toString().replace(" Jul ", "/07/");
      MyDate = MyDate.toString().replace(" Aug ", "/08/");
      MyDate = MyDate.toString().replace(" Sep ", "/09/");
      MyDate = MyDate.toString().replace(" Oct ", "/10/");
      MyDate = MyDate.toString().replace(" Nov ", "/11/");
      MyDate = MyDate.toString().replace(" Dec ", "/12/");
      setDate(MyDate);


    }

    

    getMyVideos();
  }, [ videoid ]);



  useEffect(() => {
    // Simule la récupération de l'ID de la vidéo à partir de l'URL
    const videoId = new URLSearchParams(window.location.search).get('id_video');
    if (videoId) {
      // Construit l'URL de la vidéo en fonction de l'ID
      const videoUrl = `http://141.145.200.146:5000/api/video/${videoId}/video_traitement.mp4`;
      setVideoUrl(videoUrl);
    }
 }, []);

  useEffect(() => {
    if (area.length >   0) {
      let labels = Array.from({ length: area.length }, (_, i) => i);
      let dataPoints = [];

      function animateData(index) {
        if (index < area.length-0) {
          dataPoints.push(area[index]);
          setChartData({
            //labels: labels.slice(0, index +   1),
            labels: Array.from({ length: 270 }, (_, index) => ((index+1) / 30).toFixed(1)),
            datasets: [
              {
                label: 'Aire pupille',
                data: dataPoints,
                borderColor: 'rgba(107,   114,   128,   1)',
                backgroundColor: 'rgba(0,   113,   143,   1)',
              },
            ],
          });

          setTimeout(() => animateData(index +   1),   30);
        }
      }

      animateData(0);
    }
  }, [area]);



  return (
    <>  
      <Header></Header>

      <div className=" h-screen w-screen">
      
        
      
        <hr className="w-full h-[4px] bg-beige"></hr>
      
        <div className='flex h-[calc(100%-10px)] '>
      
      
          <div id="main_code" className=" h-fit  w-full bg-gray-300"> 
      
            <div className=" w-full  ">
               
                <div className="text-xl p-2 font-bold text-[#082431]">
                    Vidéo n° 
                  {
                    video && video.id_video 
                  }
                  {' le '}
                  {
                        date && date
                   }

                </div>
      
      
                <div className="w-full h-[10px] bg-transparent"></div>
      
                <div className="flex">
                  <div className=" m-4  flex justify-center items-center justify-items-center w-1/3 ">
                    <div className="text-xl font-bold text-[#082431] bg-white rounded-lg shadow-xl border-2 w-full  border-gray-400 flex justify-center items-center justify-items-center">
                      <video  autoPlay muted src={'https://myo6.duckdns.org/api/video/' + video.id_video + '/video_traitement.mp4'} type="video/mp4"></video>

                    </div>
                  </div>
                  <div className="m-1 flex justify-center items-center justify-items-center w-1/2">
                    <div className="text-xl font-bold text-[#082431] bg-white rounded-lg shadow-xl border-2 w-full h-full border-gray-400 flex justify-center items-center justify-items-center">
                      <Line data={chartData} options={options} />
                    </div>
                  </div>
                </div>




                <div className={showDiv ? 'fadeIn' : 'fadeOut'}>


                  <div className="flex ">
                    <div className="m-4  bg-white rounded-lg shadow-xl border-2  border-gray-400  justify-center items-center justify-items-center w-2/3 ">
                        <div className="text-2xl flex font-bold text-[#082431] justify-center items-center justify-items-center">
                          Résultats
                        </div>
                          <div className="flex  justify-center items-center justify-items-center">
                          <div className=" p-4 text-lg flex font-bold text-[#082431]  ">
                            Temps de réaction:
                            {'  '} 
                            { video && video.measure_metric && video.measure_metric.reaction_time }
                            {'  '} 
                            s
                          </div>
                          <div className=" p-4 pl-20 text-lg flex font-bold text-[#082431]  ">
                            Vitesse de constriction moyenne: 
                            {'  '} 
                            { video && video.measure_metric && video.measure_metric.average_constriction_velocity_area }
                            {'  '} 
                            mm/s
                          </div>
                        </div>


                        <div className="flex  justify-center items-center justify-items-center">
                          <div className=" p-4 text-lg flex font-bold text-[#082431]  ">
                            Temps de constriction:
                            {'  '} 
                            { video && video.measure_metric && video.measure_metric.time_constriction }
                            {'  '} 
                            s
                          </div>
                          <div className=" p-4 pl-20 text-lg flex font-bold text-[#082431]  ">
                            Vitesse de constriction maximale: 
                            {'  '} 
                            { video && video.measure_metric && video.measure_metric.max_constriction_velocity_area }
                            {'  '} 
                            mm/s
                          </div>
                        </div>
                      
                      </div>

                      
                     
                    <div className="m-4  bg-white rounded-lg shadow-xl border-2  border-gray-400  justify-center items-center justify-items-center w-1/4 ">
                        <div className="text-2xl flex font-bold text-[#082431] justify-center items-center justify-items-center">
                          Etat de forme
                        </div>
                        
                        <div className="text-6xl p-4 flex font-bold text-[#082431] justify-center items-center justify-items-center">
                        {Math.round(4*(video && video.measure_metric && video.measure_metric.average_constriction_velocity_area)) }%
                        </div>
                      </div>
                      </div>
                      </div>
      </div>
    </div>
  </div>
</div>
</>
);
}
export async function getServerSideProps() {
  // fetch env.local variables named DEBUG_MODE
console.log(process.env.DEBUG_MODE);
  return {
    props: { DEBUG_MODE: process.env.DEBUG_MODE },
  };
}