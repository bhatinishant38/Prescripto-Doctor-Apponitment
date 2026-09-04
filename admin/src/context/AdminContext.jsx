import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useEffect } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

  const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken"):"");
  const [allDoctors ,setAllDoctors] = useState([])
  const [appointments ,setAppointments] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const getAllDoctors = async ()=>{

    try {
        const {data}= await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
        if(data.success){
          setAllDoctors(data.allDoctors)
          console.log(data.allDoctors)
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeAvailability = async (docId)=> {
    try {
      const {data} = await axios.post(backendUrl+"/api/admin/change-availablity" ,{docId} ,{headers :{aToken }})
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }     
    } catch (error) {
       toast.error(error.message)  
    }
    
  }
  const getAllAppointments = async ()=>{
    try {
      const {data} = await axios.get(backendUrl+"/api/admin/get-appointments",{headers:{aToken}})
      console.log("papa")
      if(data.success){
        console.log(data)
        setAppointments(data.allAppointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)   
    }
  }
  useEffect(()=>{
    if(aToken){
      getAllAppointments()

    }
    
  },[aToken])


  const value = {
    aToken,
    setAToken,
    backendUrl,
    allDoctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
