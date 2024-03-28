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

export default function Home(props) {
  let baseUrl = "s";
  if (props.DEBUG_MODE === 'true') {
    baseUrl = "http://localhost:3000/";
    console.log("DEBUG_MODE");
  } else {
    baseUrl = "https://myo6.vercel.app/";
    console.log(baseUrl);
  }

  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedOptionSleepQuality, setSelectedOptionSleepQuality] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedAsleepTime, setSelectedAsleepTime] = useState('');
  const [selectedWakeupTime, setSelectedWakeupTime] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ... (reste du code inchangé)

  
  async function getUser() {

    const res = await fetch(baseUrl + 'api/getAllUser', {
    //const res = await fetch('http://localhost:3000/api/getUsers_Test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
    setUsers(data);
  }

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    const selectedUser = users.find(user => user.id_user === selectedOption);
    if (selectedUser) {
       setSelectedUserGender(selectedUser.sex);
    }
  };

  useEffect(() => {
    getUser()
  }, []);


  const isFormValid = () => {
    if (
      !selectedOptionSleepQuality
    ) {
      return false;
    }
    return true;
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }
  
    setErrorMessage('');


    
    let date = new Date();
    let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const sleepQuality = parseInt(selectedOptionSleepQuality, 10);


    const url_upload_form = 'https://myo6.duckdns.org/upload/form';
    const data_form = {
      "id_user": selectedValue,
      "date_record":date1,
    //"date_record": "2021-11-01",
      "sleep_quality": sleepQuality,
      // "asleep_time": "23:15",
      // "wakeup_time": "07:35",
      "asleep_time": selectedAsleepTime,
      "wakeup_time": selectedWakeupTime,
      "weight": selectedWeight,
      "train_lastday": trainLastDay,
      "train_perf": trainPerf,
      "phys_cond": physCond,
      "stress": stress,
      "muscle_sore": muscleSore,
      "fatigue_subj": fatigueSubj,
      "injuried": injuried,
      "alcohol": alcohol,
      "menstruation": menstruation,
      "travel": travel,
      "sickness": sickness
    };
    console.log(data_form);




    try {
      const response = await fetch(url_upload_form, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_form),
      });

      if (response.ok) {
        setSubmissionMessage('Le questionnaire a été envoyé avec succès.');
      } else {
        setSubmissionMessage('Une erreur s\'est produite lors de l\'envoi du questionnaire.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmissionMessage('Une erreur s\'est produite lors de l\'envoi du questionnaire.');
    }
  };

  return (
    <>
      <Header></Header>

      <div className="h-screen w-screen">
        <Navbar></Navbar>
        <hr className="w-full h-[4px] bg-beige"></hr>
        <div className='flex h-[calc(100%-84px)] '>
          {/* <SideBar></SideBar> */}
          <div id="main_code" className="h-fit w-full bg-gray-300">
            {/* ... (code existant pour le formulaire) */}


            <div className="w-full p-2 ">
              <div className="flex bg-white rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-fit">
                <div className="text-xl font-bold text-[#082431]">
                  Questionnaire
                </div>
              </div>
            </div>
            <div className="text-xl font-bold text-[#082431] pl-4">
              Utilisateur : 
            

            <select value={selectedValue} onChange={handleSelectChange} className="bg-white rounded-lg m-4 w-auto shadow-xl border-2 border-gray-400 text-lg">
              {users.map(user => (
                <option key={user.id_user} value={user.id_user}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </select>
            </div>



            <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className=" bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p>Quel est votre poids aujourd&apos;hui ?</p>
      <input
        type="text"
        value={selectedWeight}
        onChange={(e) => setSelectedWeight(e.target.value)}
        placeholder="Saisissez votre réponse"
      />
    </div>
    </div>



<div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className=" bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p>À quelle heure vous êtes-vous endormi(e) hier soir ?</p>
      <input
        type="time"
        id="heure"
        name="heure"
        value={selectedAsleepTime}
        onChange={(e) => setSelectedAsleepTime(e.target.value)}
      />
    </div>
    </div>

    <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className=" bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">

  <p>À quelle heure vous êtes-vous réveillé(e) ce matin ?</p>
  <input
    type="time"
    id="heure"
    name="heure"
    value={selectedWakeupTime}
    onChange={(e) => setSelectedWakeupTime(e.target.value)}
  />
</div>
</div>


{/* SLEEP QUALITY */}



            <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


                <form>
                  <p>Quelle est votre qualité de sommeil ?</p>
                  <input
                    type="radio"
                    id="quality1"
                    name="sleep_quality"
                    value="1"
                    checked={selectedOptionSleepQuality === '1'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality1">1</label>


                  {"  "}
                  <input
                    type="radio"
                    id="quality2"
                    name="sleep_quality"
                    value="2"
                    checked={selectedOptionSleepQuality === '2'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality2">2</label>


                  {"  "}
                  <input
                    type="radio"
                    id="quality3"
                    name="sleep_quality"
                    value="3"
                    checked={selectedOptionSleepQuality === '3'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality3">3</label>


                  {"  "}
                  <input
                    type="radio"
                    id="quality4"
                    name="sleep_quality"
                    value="4"
                    checked={selectedOptionSleepQuality === '4'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality4">4</label>


                  {"  "}
                  <input
                    type="radio"
                    id="quality5"
                    name="sleep_quality"
                    value="5"
                    checked={selectedOptionSleepQuality === '5'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality5">5</label>


                  {"  "}
                  <input
                    type="radio"
                    id="quality6"
                    name="sleep_quality"
                    value="6"
                    checked={selectedOptionSleepQuality === '6'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality6">6</label>


                  {"  "}
                  <input
                    type="radio"
                    id="quality7"
                    name="sleep_quality"
                    value="7"
                    checked={selectedOptionSleepQuality === '7'}
                    onChange={(e) => setSelectedOptionSleepQuality(e.target.value)}
                  />
                  <label htmlFor="quality5">7</label>


                </form>

              </div>
            </div>

            <div className="flex w-full p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              {errorMessage && <div className="bg-red-500 text-white rounded-lg shadow-xl border-2 border-gray-400 p-2">{errorMessage}</div>}
              {submissionMessage && <div className="bg-green-500 text-white rounded-lg shadow-xl border-2 border-gray-400 p-2">{submissionMessage}</div>}
            </div>

            <div className="flex w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-sky-600 text-center text-white rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-full">
            <button onClick={handleSubmit}>Envoyer</button>
            </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps() {
  // fetch env.local variables named DEBUG_MODE
  console.log(process.env.DEBUG_MODE);
  return {
    props: { DEBUG_MODE: process.env.DEBUG_MODE },
  };
}