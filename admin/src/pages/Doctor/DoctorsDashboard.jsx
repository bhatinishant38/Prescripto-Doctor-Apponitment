import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorsDashboard = () => {

  const {dToken,dashboardData,getDashboardData} = useContext(DoctorContext)
  useEffect(()=>{

    if(dToken){
      getDashboardData()
      console.log(dashboardData)
    }
  },[dToken])
  return (
    <div>DoctorsDashboard</div>
  )
}

export default DoctorsDashboard