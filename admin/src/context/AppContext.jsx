import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const calculateAge = (dob)=>{
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    return age
  }

  const value = {
    calculateAge
  };
  
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
};
