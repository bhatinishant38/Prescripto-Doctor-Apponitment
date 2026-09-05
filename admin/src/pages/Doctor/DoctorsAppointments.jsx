import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorsAppointments = () => {

  const { dToken ,appointments ,getAppointments} = useContext(DoctorContext)

  useEffect(()=>{
    if(dToken){
      getAppointments()
    }
  },[dToken])

  
  return (
    <div>DoctorsAppointments</div>
  )
}

export default DoctorsAppointments