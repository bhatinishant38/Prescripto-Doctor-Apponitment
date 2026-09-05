import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [dToken ,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')

  const value = {
    dToken,
    setDToken,
    backendUrl
  };
  
  return (
    <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>)
};
