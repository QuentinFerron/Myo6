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

export default function Home({  }) {

  return (
    <>
      <Header></Header>

      <div className=" h-screen w-screen">

        <Navbar></Navbar>

        <hr className="w-full h-[4px] bg-beige"></hr>

        <div className='flex h-[calc(100%-84px)] '>
          {/* <SideBar></SideBar> */}

          <div id="main_code" className="flex h-full  w-full bg-gray-300"> 
          <div className=" w-full p-2 ">

            </div>
            </div>





      </div>      

    </div>
  </>
  )
}
