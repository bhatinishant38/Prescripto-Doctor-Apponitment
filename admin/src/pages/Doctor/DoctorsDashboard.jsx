import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorsDashboard = () => {

  const {dToken,dashboardData,setDashboardData,getDashboardData} = useContext(DoctorContext)

  useEffect(()=>{
    if(dToken){
      getDashboardData()

    }
  },[dToken])
  return dashboardData && (
    <div>

      DoctorsDashboard</div>
  )
}

export default DoctorsDashboard