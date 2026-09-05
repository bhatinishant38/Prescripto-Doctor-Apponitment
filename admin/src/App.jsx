import React, { useContext } from "react";
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Admin/Dashboard.jsx";
import AllApointments from "./pages/Admin/AllApointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctors.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorsDashboard from "./pages/Doctor/DoctorsDashboard.jsx";
import DoctorsAppointments from "./pages/Doctor/DoctorsAppointments.jsx";
import DoctorsProfile from "./pages/Doctor/DoctorsProfile.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    // For  Admin Pages
    <div className="bg-[#F8F9FD] ">
      <ToastContainer />
      <Navbar></Navbar>
      <div className="flex items-start">
        <Sidebar />
        <Routes>

          {/*  Admin Route */}
          
          <Route path="/admin-dashboard" element={<DashBoard />} />
          <Route path="/all-appointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />

          {/* Doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorsDashboard />} />
          <Route
            path="/doctor-appointments"
            element={<DoctorsAppointments />}
          />
          <Route path="/doctor-profile" element={<DoctorsProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    // For Doctors Pages
    <div>
      <Login></Login>
      <ToastContainer />
    </div>
  );
};

export default App;
