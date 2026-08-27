import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
  import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Routes ,Route } from 'react-router-dom';
import DashBoard from  './pages/Admin/Dashboard.jsx';
import AllApointments from  './pages/Admin/AllApointments.jsx'
import AddDoctor from './pages/Admin/AddDoctors.jsx'
import DoctorsList from './pages/Admin/DoctorsList.jsx'



const App = () => {

 
  const {aToken} = useContext(AdminContext)

  return aToken ? (

    // For  Admin Pages
    <div className='bg-[#F8F9FD] ' >
      
      <ToastContainer />
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>

          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<DashBoard/>}/>
          <Route path='/all-appointments' element={<AllApointments/>}/>
          <Route path ='/add-doctor' element={<AddDoctor />}/>
          <Route path ='/doctors-list' element={<DoctorsList />}/>

        </Routes>
      </div>
    </div>
  ) 
  : (
    // For Doctors Pages
    <div >
      <Login/>
      <ToastContainer />
    </div>
  )

}

export default App