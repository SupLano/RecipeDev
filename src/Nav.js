import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHamburger, FaEvernote, FaGuitar, FaGlobeEurope, FaGopuram, FaList, FaHome, FaStop, FaRegFolderOpen} from "react-icons/fa"
import Search from './Utils/Search'
import {AppNavContext} from './App'


 
function Nav() {
  const {isNavActive, handleNavDrop}= useContext(AppNavContext)
  const { pathname } = useLocation()
  let showHome = true
  if (pathname === '/') {
      showHome = false
  }
  
  return (
        <div className={' top-0 left-0 right-0 m-0 border-b dark:border-gray-600 shadow bg-gray-50 fixed w-full z-30'}>
                <div className={'md:hidden block'}>
                    <FaRegFolderOpen className={'z-10 pt-2 h-12 w-24 pb-1 text-black'} onClick={handleNavDrop}/>
                </div>

                <div className={isNavActive ? 'bg-ink-700 hidden md:flex md:flex-col md:flex-wrap md:justify-center md:items-center  lg:flex lg:flex-row lg:justify-around lg:align-top' : 'bg-ellow-200 flex flex-col justify-between items-center flex-wrap lg:flex lg:flex-row lg:justify-around '}> 
                        <div className={'flex border-r-gray-100 bg-lue-100 flex-col md:flex-row justify-around items-center font-na font-extrabold overflow-hidden '}> 

                                    {showHome && 
                                    <div>
                                        <Link className={`z-30 justify-center uppercase md:p-2  text-blue-800-900`} to="/">
                                                                 <FaHome className='w-10 h-6 md:mr-10'></FaHome>
                                         </Link>
                                    </div>  }

                                    <Link className={` flex justify-center uppercase text-2xl pr-5 pl-5 md:p-2  text-blue-800-900`} to="/african">
                                        <FaEvernote className={'pt-2'}/>
                                        <p className={'font-extrabold'}>African</p> 
                                    </Link>
                                

                                    <Link className={`flex justify-center uppercase text-2xl pr-5 pl-5 md:p-3 md:pl-4   text-slate-000 `} to="/american">
                                        <p>American</p>
                                        <FaHamburger className={' pt-2'}/>
                                    </Link>
                                    

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4   text-slate-000 `} to="/chinese">
                                        <FaGopuram className={'pt-2'}/>
                                        <p>Chinese</p>                                        
                                    </Link>

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4  text-slate-000`} to="/european">
                                        <p>European</p>
                                        <FaGlobeEurope className={'pt-2'}/>
                                    </Link>

                                    <Link className={`flex justify-center uppercase text-2xl md:p-3 md:pl-4   text-slate-000 `} to="/spanish">
                                        < FaGuitar className={'pt-2'}/>
                                        <p>Spanish</p>                                        
                                    </Link>
                        </div>
                        <Search/>
                </div>
        </div>
  )
}

export default Nav