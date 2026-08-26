import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
  import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Routes ,Route } from 'react-router-dom';



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
          <Route/>

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