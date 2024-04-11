import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'

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
  const [isBilanSelected, setIsBilanSelected] = useState(true);

//récupérer les utilisateurs
  async function getUser() {
    const res = await fetch(baseUrl + 'api/getAllUser', {});
    //const res = await fetch('http://localhost:3000/api/getUsers_Test', {});

    const data = await res.json();
    setUsers(data);
  }
  
  //initialisation des données de la page
  useEffect(() => {
    if (window.location.href.split("=")[1] == undefined) {
      // redirect to /index
      //window.location.href = '/'
      // alert("Ceci est une alerte !");
    } else {
      setCurrentUserid(window.location.href.split("=")[1])
      setSelectedValue(window.location.href.split("=")[1]);
      getVideo(window.location.href.split("=")[1]);
      getUser();
    }
  }, []);

  return (
    <>
      <Header></Header>
      <div className="h-screen w-screen">
        <Navbar></Navbar>
        <hr className="w-full h-[4px] bg-beige"></hr>
      {
        <div className='flex  min-h-[calc(100%-84px)] bg-gray-300 h-auto '>
          {/* <SideBar></SideBar> */}
          <div id="main_code" className="h-full  w-full ">
            
            <div className="w-full flex h-10 bg-red-300">

              <button className="w-1/2 bg-gray-500 hover:bg-gray-400 h-full flex justify-center items-center justify-items-center text-white transition duration-500 ease-in-out"
                onClick={() => setIsBilanSelected(true)}>
                  Associer un Myo6
              </button>

              <div className="w-1 bg-black h-full">

              </div>

              <button className="w-1/2 bg-gray-500 hover:bg-gray-400 h-full flex justify-center items-center justify-items-center text-white transition duration-500 ease-in-out"
                onClick={() => setIsBilanSelected(false)}>
                  Associer une empreinte
              </button>

            </div>

            {
              isBilanSelected ? 
              <div className='p-2'>
              <div className="flex ">
                <div className="bg-white rounded-lg w-1/4 h-1/2 m-1 shadow-xl border-2 border-gray-400">
                  <div className="justify-center items-center justify-items-center h-full text-center">
                    <div className="text-lg sm:text-2xl font-bold text-[#082431] flex justify-center items-center h-full">
                      <div className="flex flex-col justify-center items-center">
                      :
                        <div className="text-sm font-bold text-[#082431]">
                          
                          {users.find(user => user.id_user == selectedValue) && users.find(user => user.id_user == selectedValue).firstname} 
                          {" "}
                          {users.find(user => user.id_user == selectedValue) && users.find(user => user.id_user == selectedValue).lastname}   
                          {" "}                 
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>

              :
              (
              <div className='h-screen'>
              <iframe src={"associerMyo6"} width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
              </div>
              )            

            }
            
          </div>
        </div>
       
      }
          
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