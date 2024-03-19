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

export default function Home({ projects }) {
  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState(0);


  async function getUser() {
    const res = await fetch('http://localhost:3000/api/getAllUser', {
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
  };

  useEffect(() => {
    getUser()
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    let date = new Date();
    let date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


    const url_upload_form = 'http://141.145.200.146:5000/api/create_user';
    const data_form = {
      // 'firstname' : 'Prénom',
      // 'lastname' : 'Nom',
      // 'password' : '12345',
      // 'email' : 'test_2@gmail.com',
      // 'birthdate' : '1960-10-23',
      // 'sex' : 'M'
      'firstname' : firstName,
      'lastname' : lastName,
      'password' : password,
      'email' : emailAddress,
      'birthdate' : birthDate,
      'sex' : sex
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

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données');
      }

      const responseData = await response.json();
      console.log(responseData);
      // Gérer la réponse du serveur ici
    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur ici
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
        <div className='flex h-[calc(100%-84px)]'>
          {/* <SideBar></SideBar> */}
          <div id="main_code" className=" h-fit w-full bg-gray-300">
            <div className="w-full p-2 ">
              <div className="flex bg-white rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-fit">
                <div className="text-xl font-bold text-[#082431]">
                  Creation de compte
                </div>
              </div>
            </div>




            <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p> Prénom : </p>
  
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Saisissez votre réponse"
      />
    </div>
    </div>


    <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p> Nom : </p>
  
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Saisissez votre réponse"
      />
    </div>
    </div>



    <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p> Mot de passe : </p>
  
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Saisissez votre réponse"
      />
    </div>
    </div>



    <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p> Adresse Mail : </p>
  
      <input
        type="text"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        placeholder="Saisissez votre réponse"
      />
    </div>
    </div>



<div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2  border-gray-400 p-2 justify-center items-center justify-items-center h-full">


      <p>Date de naissance :</p>
      <input
        type="date"
        id="heure"
        name="heure"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
    </div>
    </div>
      








            <div className="w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-white text-center rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-full">


                <form>
                  <p>Sexe : </p>

                  <input
                    type="radio"
                    id="sex1"
                    name="sex"
                    value="M"
                    checked={sex === 'M'}
                    onChange={(e) => setSex(e.target.value)}
                  />
                  <label htmlFor="sex1">Homme</label>


                  {"  "}
                  <input
                    type="radio"
                    id="sex2"
                    name="sex"
                    value="F"
                    checked={sex === 'F'}
                    onChange={(e) => setSex(e.target.value)}
                  />
                  <label htmlFor="sex2">Femme</label>


                </form>

              </div>
            </div>

            <div className="flex w-1/2 p-2 justify-center items-center justify-items-center ml-auto mr-auto ">
              <div className="flex bg-sky-600 text-center text-white rounded-lg shadow-xl border-2 mb-2 border-gray-400 p-2 justify-center items-center justify-items-center h-full">
            <button onClick={handleSubmit}>Créer mon compte</button>
            </div>
            </div>


          </div>
          
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  )
}