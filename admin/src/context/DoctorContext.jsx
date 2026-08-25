import { createContext } from "react";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {

  const value = {};
  
  return (
    <DoctorContext.Provider value={value}>
        {children}
    </DoctorContext.Provider>)
};
