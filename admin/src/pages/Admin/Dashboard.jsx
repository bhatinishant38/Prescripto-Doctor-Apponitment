import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Dashboard = () => {

  const { aToken ,getDashData,dashData ,cancelAppointment} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken){

    }

  },[aToken])
  return (
    <div></div>
  )
}

export default Dashboard