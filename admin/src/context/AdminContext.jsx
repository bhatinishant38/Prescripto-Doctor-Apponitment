import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

  const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken"):"");
  const [allDoctors ,setAllDoctors] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

  const getAllDoctors = async ()=>{

    try {
        const {data}= await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
        if(data.success){
          setAllDoctors(data.doctors)
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const value = {
    aToken,
    setAToken,
    backendUrl,
    allDoctors,
    getAllDoctors
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
