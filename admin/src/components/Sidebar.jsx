import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div className="min-h-screen bg-white border-r border-gray-200">
      {aToken && (
        <ul className="text-[#515151]">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 sm:px-4 md:px-9 md:min-w-72 cursor-pointer transition-all hover:bg-gray-50 ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
          >
            <img
              className="w-5 h-5 sm:w-6 sm:h-6"
              src={assets.home_icon}
              alt="Dashboard"
            />
            <p className="hidden sm:block text-sm md:text-base">Dashboard</p>
          </NavLink>

          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 sm:px-4 md:px-9 md:min-w-72 cursor-pointer transition-all hover:bg-gray-50 ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
          >
            <img
              className="w-5 h-5 sm:w-6 sm:h-6"
              src={assets.appointment_icon}
              alt="Appointments"
            />
            <p className="hidden sm:block text-sm md:text-base">Appointments</p>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 sm:px-4 md:px-9 md:min-w-72 cursor-pointer transition-all hover:bg-gray-50 ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
          >
            <img
              className="w-5 h-5 sm:w-6 sm:h-6"
              src={assets.add_icon}
              alt="Add Doctor"
            />
            <p className="hidden sm:block text-sm md:text-base">Add Doctor</p>
          </NavLink>

          <NavLink
            to={"/doctors-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 sm:px-4 md:px-9 md:min-w-72 cursor-pointer transition-all hover:bg-gray-50 ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
          >
            <img
              className="w-5 h-5 sm:w-6 sm:h-6"
              src={assets.people_icon}
              alt="Doctors List"
            />
            <p className="hidden sm:block text-sm md:text-base">Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
