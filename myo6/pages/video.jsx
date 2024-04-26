// import React, { useState } from 'react';

// function VideoRecorder() {
//    const [stream, setStream] = useState(null);
//    const [recording, setRecording] = useState(false);
//    const [videoBlob, setVideoBlob] = useState(null);

//    const startRecording = async () => {
//      try {
//        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//        setStream(stream);

//        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//        const chunks = [];

//        mediaRecorder.addEventListener('dataavailable', (event) => {
//          chunks.push(event.data);
//        });

//        mediaRecorder.addEventListener('stop', () => {
//          const videoBlob = new Blob(chunks, { type: 'video/webm' });
//          setVideoBlob(videoBlob);
//          setRecording(false);
//        });

//        mediaRecorder.start();
//        setRecording(true);

//        setTimeout(() => {
//          mediaRecorder.stop();
//        }, 10000); // Enregistrement de 10 secondes
//      } catch (error) {
//        console.error('Erreur lors de laccès à la caméra :', error);
//      }
//    };

//    const sendVideoToAPI = async () => {
//      if (videoBlob) {
//        try {
//          const response = await fetch('https://myo6.duckdns.org/upload/video', {
//            method: 'POST',
//            headers: {
//            'X-API-Key': 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd' // Ajout de la clé API dans les en-têtes
//          },
//          body: {'file': '/home/myo6/Myo6Pi/Data/ID_19/video.avi', videoBlob,}
        
//        });

//          if (response.ok) {
//            console.log('Vidéo envoyée avec succès');
//          } else {
//            console.error('Erreur lors de lenvoi de la vidéo');
//          }
//        } catch (error) {
//          console.error('Erreur lors de lenvoi de la vidéo :', error);
//        }
//      }
//    };

//    return (
//      <div>
//        <button onClick={startRecording} disabled={recording}>
//          {recording ? 'Enregistrement en cours...' : 'Démarrer lenregistrement'}
//        </button>
//        {videoBlob && (
//          <div>
//            <video src={URL.createObjectURL(videoBlob)} controls />
//            <button onClick={sendVideoToAPI}>Envoyer la vidéo à l'API</button>
//          </div>
//        )}
//      </div>
//    );
//  }

// export default VideoRecorder;

/////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// const API_KEY = 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd';
// const HEADER = { 'X-API-Key': API_KEY };
// const SERVER_URL = `${link}/upload/video`;

// function VideoRecorder() {
//   const [stream, setStream] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [uploadError, setUploadError] = useState(null);
//   const [videoPath, setVideoPath] = useState('');
//   const [response, setResponse] = useState(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(stream);
//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       const chunks = [];
//       mediaRecorder.addEventListener('dataavailable', (event) => {
//         chunks.push(event.data);
//       });
//       mediaRecorder.addEventListener('stop', () => {
//         const videoBlob = new Blob(chunks, { type: 'video/webm' });
//         setVideoBlob(videoBlob);
//         setRecording(false);
//       });
//       mediaRecorder.start();
//       setRecording(true);
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 10000); // Enregistrement de 10 secondes
//     } catch (error) {
//       console.error('Erreur lors de l\'accès à la caméra :', error);
//     }
//   };

//   const sendVideoToAPI = async () => {
//     if (videoBlob) {
//       try {
//         const response = await fetch('https://myo6.duckdns.org/upload/video', {
//           method: 'POST',
//           files : videoBlob,
//           data : {'video_path': '/home/myo6/Myo6Pi/Data/ID_19/video.avi'},
//           headers: {
//             'X-API-Key': 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd',
//           },
//         });

//         if (response.ok) {
//           console.log('Vidéo envoyée avec succès');
//           setUploadSuccess(true);
//           setUploadError(null);
//         } else {
//           console.error('Erreur lors de l\'envoi de la vidéo');
//           setUploadSuccess(false);
//           setUploadError(`Failed to upload video. Status code: ${response.status}`);
//         }
//       } catch (error) {
//         console.error('Erreur lors de l\'envoi de la vidéo :', error);
//         setUploadSuccess(false);
//         setUploadError(`Error occurred: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={startRecording} disabled={recording}>
//         {recording ? 'Enregistrement en cours...' : 'Démarrer l\'enregistrement'}
//       </button>
//       {videoBlob && (
//         <div>
//           <video src={URL.createObjectURL(videoBlob)} controls />
//           <button onClick={sendVideoToAPI}>Envoyer la vidéo à l'API</button>
//           {uploadSuccess && <p>Vidéo envoyée avec succès !</p>}
//           {uploadError && <p>{uploadError}</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoRecorder;

// import React, { useState } from 'react';

// const API_KEY = 'q9567FXn71h6Xgio9htWjMNUsC2NBkpd';
// const HEADER = { 'X-API-Key': API_KEY };
// const SERVER_URL = "https://myo6.duckdns.org/upload/video";

// function VideoRecorder() {
//   const [stream, setStream] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(stream);
//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       const chunks = [];
//       mediaRecorder.addEventListener('dataavailable', (event) => {
//         chunks.push(event.data);
//       });
//       mediaRecorder.addEventListener('stop', () => {
//         const videoBlob = new Blob(chunks, { type: 'video/webm' });
//         setVideoBlob(videoBlob);
//         setRecording(false);
//       });
//       mediaRecorder.start();
//       setRecording(true);
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 10000); // Enregistrement de 10 secondes
//     } catch (error) {
//       console.error("Erreur lors de laccès à la caméra :", error);
//     }
//   };

//   const sendVideoToAPI = async () => {
//     const formData = new FormData();
//     formData.append('file', videoBlob);
//     formData.append('video_path', videoBlob.name);

//     try {
//       const response = await fetch(SERVER_URL, {
//         method: 'POST',
//         headers: HEADER,
//         body: formData,
//       });
//       const data = await response.json();
//       console.log('Réponse de lAPI :', data);
//     } catch (error) {
//       console.error("Erreur lors de l'envoi de la vidéo :", error);
//     }
//   };
  

//   return (
//     <div>
//       <button onClick={startRecording} disabled={recording}>
//         {recording ? "Enregistrement en cours..." : "Démarrer l'enregistrement"}
//       </button>
//       {videoBlob && (
//         <div>
//           <video src={URL.createObjectURL(videoBlob)} controls />
//           <button onClick={sendVideoToAPI}>Envoyer la vidéo à l&apos;API</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VideoRecorder;


// import React, { useState, useRef } from 'react';

// const App = () => {
//   const [userId, setUserId] = useState('');
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       videoRef.current.srcObject = stream;
//       const mediaRecorder = new MediaRecorder(stream);
//       const chunks = [];

//       mediaRecorder.addEventListener('dataavailable', (event) => {
//         chunks.push(event.data);
//       });

//       mediaRecorder.addEventListener('stop', () => {
//         const blob = new Blob(chunks, { type: 'video/webm' });
//         uploadVideo(blob);
//       });

//       mediaRecorder.start();
//       setTimeout(() => {
//         mediaRecorder.stop();
//       }, 10000);
//     } catch (err) {
//       console.error('Error accessing webcam:', err);
//     }
//   };

//   const uploadVideo = (blob) => {
//     const formData = new FormData();
//     formData.append('video', blob, `video_${userId}.webm`);

//     fetch('https://myo6.duckdns.org/upload/video', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => {
//         console.log('Video uploaded successfully');
//       })
//       .catch((error) => {
//         console.error('Error uploading video:', error);
//       });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         placeholder="Enter user ID"
//       />
//       <button onClick={startRecording}>Start Recording</button>
//       <video ref={videoRef} autoPlay />
//     </div>
//   );
// };

// export default App;

/////////////////////////////////////////////////////////////////////////////////////////////

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

//import "@fontsource/poppins";

import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { Component } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'



export default function Home({  }) {


    const [id, setid] = useState('');
    const [stream, setStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);

    let date = new Date();
    let datevideo = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '_' + date.getHours() + 'h' + date.getMinutes() + 'min' + date.getSeconds() + 'sec';
    let path = 'ID_' + id + '/' + datevideo;

    
    
    const startRecording = async () => {
          try {
            const constraints = {
              video: {
                frameRate: { ideal: 30 } // Définit le nombre d'images par seconde idéal à 30 fps
              }
            };
            
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(stream);
            // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // setStream(stream);
    
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            const chunks = [];
    
            mediaRecorder.addEventListener('dataavailable', (event) => {
              chunks.push(event.data);
            });
    
            mediaRecorder.addEventListener('stop', () => {
              const videoBlob = new Blob(chunks, { type: 'video/webm' });
              setVideoBlob(videoBlob);
              setRecording(false);
            });
    
            mediaRecorder.start();
            setRecording(true);
    
            setTimeout(() => {
              mediaRecorder.stop();
            }, 10000); // Enregistrement de 10 secondes
          } catch (error) {
            console.error('Erreur lors de laccès à la caméra :', error);
          }
        };
    
    const sendVideoToAPI = async () => {
          if (videoBlob) {
            console.log('Envoi de la vidéo et de l\'ID à l\'API' , videoBlob, path);
            try {
              const formData = new FormData();
              formData.append('file', videoBlob, 'video.webm');
              formData.append('video_path', path);
        
              const response = await fetch('https://myo6.duckdns.org/upload/video_web', {
                method: 'POST',
                body: formData,
              });
        
              if (response.ok) {
                console.log('Vidéo et ID envoyés avec succès');
              } else {
                console.error('Erreur lors de l\'envoi de la vidéo et de l\'ID');
              }
            } catch (error) {
              console.error('Erreur lors de l\'envoi de la vidéo et de l\'ID :', error);
            }
          }
        };

  

  return (
    <>
    {/* <div className="flex-container"> */}
      <Header></Header>
      {/* <div className="scrollable-content"> */}
      <div className="h-screen w-screen"> 
        <Navbar></Navbar>
        <hr className="w-full h-[4px] bg-beige"></hr>
        <div className='flex  min-h-[calc(100%-68px)] bg-gray-300 h-auto '>
          {/* <SideBar></SideBar> */}
          <div id="main_code" className="h-full  w-full ">
            <div className="w-full p-2 ">
              <div className="flex bg-white rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-fit">
                <div className="text-xl font-bold text-[#082431]">
                Prise de mesure
                </div>
              </div>
            </div>




            <div className="w-full sm:w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p> ID: </p>
  
      <input
        type="text"
        value={id}
        onChange={(e) => setid(e.target.value)}
        placeholder="Saisissez votre réponse"
        style={{ width: '190px' }}
      />
    </div>
    </div>

    <div className="w-fit p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">
              <div>
        <button onClick={startRecording} disabled={recording}>
          {recording ? 'Enregistrement en cours...' : 'Démarrer l\'enregistrement'}
        </button>
         {videoBlob && (
          <div>
            <video src={URL.createObjectURL(videoBlob)} controls />
            <div className="flex w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-sky-600 text-center text-white rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-full">
              <button onClick={sendVideoToAPI}>Envoyer la vidéo</button>
                 </div>
            </div>
            
          </div>
        )}
      </div>
      </div>
      {/* {path} */}
      </div>
          </div>
        </div>
      </div>
    </>
  )
}
