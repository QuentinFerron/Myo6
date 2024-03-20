import Head from "next/head";


import Link from "next/link";


export default function SideBar({setISideBarOpen}) {
    return (         
        
            
        <div className="fixed top-0 left-0 h-full  bg-gray-500 min-w-[230px] z-10 ">
        

            <div className="p-2 ">

                <button className="text-lg p-1 font-light text-[#082431] " onClick={() => setISideBarOpen(false)}>
                    Menu
                </button>

                <div className="justify-center items-center justify-items-center text-white text-[12px]">
                    
                    <Link className=" shadow-md hover:shadow-xl  transition ease-in-out  duration-500 rounded bg-bleuclair py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                     href="/">               
                        <div className="">
                            <Image src="/assets/icons/dash.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Home
                    </Link>              
                </div>
               
                <div className="justify-center items-center justify-items-center  text-white text-[12px]">
                    
                    <Link className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-bleuclair py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    href="choixuser3">
                        <div className="">
                            <Image src="/assets/icons/documentation.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Choix Utilisateur
                    </Link>              
                </div>
                <div className="justify-center items-center justify-items-center  text-white text-[12px]">
                    
                    <Link className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-bleuclair py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    href="directmesure6">
                        <div className="">
                            <Image src="/assets/icons/settings.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Mesure en direct
                    </Link>              
                </div>
                
                <div className="justify-center items-center justify-items-center  text-white text-[12px]">
                    
                    <Link className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-bleuclair py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    href="createUser">
                        <div className="">
                            <Image src="/assets/icons/documentation.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Créer Utilisateur
                    </Link>              
                </div>



                <div className="justify-center items-center justify-items-center  text-white text-[12px]">
                    
                    <Link className="shadow-md hover:shadow-xl  transition ease-in-out  duration-500  rounded bg-bleuclair py-2 px-4 my-3 w-full flex justify-start items-center justify-items-start "
                    href="questionnaire2">
                        <div className="">
                            <Image src="/assets/icons/documentation.svg" className="w-4 h-4 mr-1" />
                        </div>
                        Remplir Questionnaire
                    </Link>              
                </div>

                

            </div>
            
        </div>
            
        
    
    )

}