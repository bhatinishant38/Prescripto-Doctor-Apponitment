import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate  } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

    const navigate = useNavigate()

    const [showMenu ,setShowMenu ] = useState(false)
    const {token ,setToken} = useContext(AppContext)

    const logout =()=>{
        localStorage.removeItem('token')
        setToken(false)
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-38 md:w-44 cursor-pointer ' src={assets.logo} alt="" />    
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to="/">
                <li className='py-1' >HOME</li>
                <hr className= {`border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden`} />
            </NavLink>
            <NavLink to="/doctors">
                <li className='py-1' >ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
               <li className='py-1' >ABOUT</li>
               <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1' >CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token
                 ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 group-hover:block hidden'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-poniter '>My Profile</p>
                            <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-poniter '>My Appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-poniter '>Logout</p>
                        </div>
                    </div>

                  </div>
                 : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-2 md:px-8 py-3 rounded-full font-sm sm:font-medium  md:block hover:scale-105 hover:shadow-2xl transition-all duration-300 '>Create Account</button>
            }

            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* ------Mobile Menu------ */}
            <div className={` ${showMenu ? "fixed w-full h-1/3  ": "hidden"} md:hidden right-0 top-0 bottom-0 z-20 overflow:hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=> setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-row justify-center items-center gap-2 mt-5 px-5 text-sm font-medium'>
                  <NavLink onClick={()=>setShowMenu(false)} to={'/'} > <p className='px-2 py-2 rounded inline-block'>HOME</p> </NavLink>
                  <NavLink onClick={()=>setShowMenu(false)} to={'/doctors'} > <p className='px-2 py-2 rounded inline-block'> ALL DOCTORS</p> </NavLink>
                  <NavLink onClick={()=>setShowMenu(false)} to={'/about'}> <p className='px-2 py-2 rounded inline-block'>ABOUT</p> </NavLink>
                  <NavLink onClick={()=>setShowMenu(false)} to={'/contact'}> <p className='px-2 py-2 rounded inline-block'>CONTACT</p> </NavLink>
                </ul>
            </div>
           

         </div>        
    </div>
  )
}

export default Navbar