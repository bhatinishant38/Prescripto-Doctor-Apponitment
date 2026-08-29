import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios'
import {  toast } from 'react-toastify';



export  const AppContext = createContext()

export const AppContextProvider =({children})=>{

     const currencySymbol= '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors ,setDoctors] = useState([])
    const [token ,setToken] = useState('')
     
    const fetchAllDoctors =  async ()=>{
        
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                console.log(data.allDoctors)
                setDoctors(data.allDoctors)              
            }else{
                toast.error(data.message)
            }    
        } catch (error) {
            console.log(error)
            toast.error(error.message)  
        }
    }

    useEffect(()=>{
        fetchAllDoctors()
    },[backendUrl])
 
    const value = {
        doctors,
        currencySymbol,
        token ,
        setToken,
        backendUrl
    }
    return  (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}