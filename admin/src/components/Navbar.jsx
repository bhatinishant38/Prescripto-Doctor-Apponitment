import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate();

  const logout = () => {  
    dToken && setDToken("")
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    navigate('/')
  };

  return (
    <div className="flex justify-between items-center px-3 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-2">
        <img
          className="w-24 sm:w-32 md:w-40 cursor-pointer object-contain"
          src={assets.admin_logo}
          alt="Logo"
        />
        <p className="hidden sm:block border px-2 sm:px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs sm:text-sm">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className="bg-primary text-white text-xs sm:text-sm px-4 sm:px-6 md:px-10 py-1.5 sm:py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
