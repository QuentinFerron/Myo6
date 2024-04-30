import React from 'react' // Importer React
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Webcam from 'react-webcam'

import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { Component } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Home({  }) {
    const [id, setid] = useState('');
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);

    const webcamRef = React.useRef(null); // Utiliser React.useRef

    let date = new Date();
    let datevideo = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '_' + date.getHours() + 'h' + date.getMinutes() + 'min' + date.getSeconds() + 'sec';
    let path = 'ID_' + id + '/' + datevideo;

    const startRecording = () => {
      setRecording(true);
      const recordingInterval = setInterval(() => {
          if (webcamRef.current) {
              const base64Image = webcamRef.current.getScreenshot();
              const binaryString = atob(base64Image.split(',')[1]);
              const arrayBuffer = new ArrayBuffer(binaryString.length);
              const uint8Array = new Uint8Array(arrayBuffer);
              for (let i = 0; i < binaryString.length; i++) {
                  uint8Array[i] = binaryString.charCodeAt(i);
              }
              const videoBlob = new Blob([uint8Array], { type: 'video/webm' });
              setVideoBlob(videoBlob);
          }
      }, 1000 / 30); // Enregistrement à 30 fps

      setTimeout(() => {
          clearInterval(recordingInterval);
          setRecording(false);
          console.log('videoBlob:', videoBlob);
      }, 10000); // Enregistrement de 10 secondes
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
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                    />
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