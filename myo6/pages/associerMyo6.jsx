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

  

  <hr className="w-full h-[4px] bg-beige"></hr>

  <div className='flex  min-h-[calc(100%-10px)] bg-gray-300 h-auto '>


  <div id="main_code" className="h-full  w-full ">

      <div className="w-full">

            </div>
            </div>





      </div>      

    </div>
  </>
  )
}
