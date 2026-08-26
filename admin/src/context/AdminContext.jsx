import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

  const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken"):"");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
