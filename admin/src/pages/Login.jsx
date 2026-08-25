import React, { useState } from 'react'
import {assets} from '../assets/assets'

const Login = () => {

    const [state ,setState] = useState('Admin')

  return (
    <form className='min-h-[80vh] flex items-center'>
         <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border border-gray-100 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto '><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state === "Admin"
                ? <p>Doctor Login? <span onClick={()=>setState("Doctor")} className='text-primary underline cursor-pointer' >Click here</span></p>
                : <p>Admin Login? <span onClick={()=>setState("Admin")} className='text-primary underline cursor-pointer' > Click here</span></p>
            }

          </div>
    </form>

  )
   
}

export default Login