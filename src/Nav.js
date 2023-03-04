import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaHamburger, FaEvernote, FaGuitar, FaGlobeEurope, FaGopuram, FaList } from "react-icons/fa"
import Search from './Utils/Search'
import {AppNavContext} from './App'


 
function Nav() {
  const {isNavActive, handleNavDrop}= useContext(AppNavContext)
  return (
        <div className={'top-0 left-0 right-0 m-0 border-b dark:border-gray-600 shadow bg-gray-50 fixed w-full z-30 pb-1'}>
                <div className={'md:hidden block'}>
                    <FaList className={'z-10 pt-2 h-12 w-24 text-black'} onClick={handleNavDrop}/>
                </div>

                <div className={isNavActive ? 'hidden md:flex md:flex-col md:flex-wrap md:justify-center md:items-center lg:flex lg:flex-row lg:justify-around lg:align-top' : 'flex flex-col justify-between items-center flex-wrap lg:flex-row lg:justify-around lg:items-center'}> 
                        <div className={'flex flex-col md:flex-row justify-center items-center font-na font-extrabold'}> 
                                    <Link className={` flex justify-center uppercase text-2xl md:p-2  text-blue-800-900`} to="/african">
                                        <FaEvernote className={'pt-1'}/>
                                        <p className={'font-extrabold'}>African</p> 
                                    </Link>
                                

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4   text-slate-000 `} to="/american">
                                        <p>American</p>
                                        <FaHamburger className={' pt-1'}/>
                                    </Link>
                                    

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4   text-slate-000 `} to="/chinese">
                                        <FaGopuram className={'pt-1'}/>
                                        <p>Chinese</p>                                        
                                    </Link>

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4  text-slate-000`} to="/european">
                                        <p>European</p>
                                        <FaGlobeEurope className={'pt-1'}/>
                                    </Link>

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4   text-slate-000 `} to="/spanish">
                                        < FaGuitar className={'pt-1'}/>
                                        <p>Spanish</p>                                        
                                    </Link>
                        </div>
                        <Search/>
                </div>
        </div>
  )
}

export default Nav