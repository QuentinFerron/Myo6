import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

//import "@fontsource/poppins";

import Footer from '../components/Footer'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'

import { useEffect } from 'react'
import { useState } from 'react'

export default function Home(props) {
  const [users, setUsers] = useState([]);
  console.log(props);


  let baseUrl = "s";
  if (props.DEBUG_MODE === 'true') {
    baseUrl = "http://localhost:3000/";
    console.log("DEBUG_MODE");
  } else {
    baseUrl = "https://myo6.vercel.app/";
    console.log(baseUrl);
  }



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

  useEffect(() => {
    getUser()
  }, []);

  return (
    <>
      <Header></Header>

      <div className="h-screen w-screen">
        <Navbar></Navbar>
        <hr className="w-full h-[4px] bg-beige"></hr>
        <div className='flex h-[calc(100%-84px)] '>
          {/* <SideBar></SideBar> */}
          <div id="main_code" className="h-full w-full bg-gray-300">
            <div className="w-full p-2 ">
              <div className="flex bg-white rounded-lg shadow-xl border-2 mb-6 border-gray-400 p-2 justify-center items-center justify-items-center h-full">
                <div className="text-xl font-bold text-[#082431]">
                  Choix Utilisateur
                </div>
              </div>
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', marginLeft: '20px' }}>Mon équipe</h2>
            <table style={{ width: '99%', borderCollapse: 'collapse', margin: '20px   10px', fontSize: '0.9em', minWidth: '400px', boxShadow: '0   0   20px rgba(0,   0,   0,   0.15)' }}>
              <thead style={{ backgroundColor: '#009879', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px   15px', textAlign: 'left', backgroundColor: '#f2f2f2', color: 'black', borderBottom: '1px solid #ddd' }}>ID</th>
                  <th style={{ padding: '12px   15px', textAlign: 'left', backgroundColor: '#f2f2f2', color: 'black', borderBottom: '1px solid #ddd' }}>First Name</th>
                  <th style={{ padding: '12px   15px', textAlign: 'left', backgroundColor: '#f2f2f2', color: 'black', borderBottom: '1px solid #ddd' }}>Last Name</th>
                  <th style={{ padding: '12px   15px', textAlign: 'left', backgroundColor: '#f2f2f2', color: 'black', borderBottom: '1px solid #ddd' }}>Age</th>
                  <th style={{ padding: '12px   15px', textAlign: 'left', backgroundColor: '#f2f2f2', color: 'black', borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '12px   15px', textAlign: 'left', backgroundColor: '#f2f2f2', color: 'black', borderBottom: '1px solid #ddd' }}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_user} style={{ borderBottom: '1px solid #ddd', padding: '12px   15px', cursor: 'pointer' }} 
                    onClick={ () => {window.location.href = `/coachPage6?id_user=` + user.id_user}}>
                    <td>
                      {user.id_user}
                    </td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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