
import Head from "next/head";
import { useState } from "react";

import Link from "next/link";
import SideBar from "./SideBar";
import Image from "next/image";

export default function Navbar() {

    const [isSideBarOpen, setISideBarOpen] = useState(false);

    return (
        
        <>
        {
            isSideBarOpen && <SideBar setISideBarOpen={setISideBarOpen} />
        }

        <div className="w-full flex">
            
            
            <div className="flex  w-full shadow-md h-16  bg-bleugris">
                
                <div className="w-1/2  ">

                    <div className="flex justify-start items-center justify-items-center h-full w-full p-2">

                        <button className="" onClick={() => setISideBarOpen(!isSideBarOpen)}>
                            ||||
                        </button>

                        <img src="/assets/images/logo.png" alt="Logo" className="h-full w-auto rounded-md ml-5" />
                        {/* <h1 className="text-4xl text-white pl-5">Myo6</h1> */}
                        <Link href="/" className="text-white text-lg sm:text-3xl pl-5 pr-10 ">Myo6</Link>

                    </div>

                </div>
                <div className="w-1/2">

                <div className="flex justify-end items-center justify-items-center h-full w-full p-2">

                    <Link href="/Help" className="text-white text-sm sm:text-3xl pr-10">Help</Link>

                    <Link href="/About" className="text-white text-sm sm:text-3xl pr-10">A propos</Link>

                    <button className="h-full">

                        <img src="/assets/icons/user.svg" alt="Logo" className="h-2/3 rounded-md mr-5" />

                    </button>
                    
                    

                </div>

                </div>

            </div>
         
                    
            
        </div>

        </>
        
    
    )

}