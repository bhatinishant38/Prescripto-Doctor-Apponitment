import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorsList = () => {

  const {aToken ,allDoctors,getAllDoctors} = useContext(AdminContext)

  useEffect(()=>{
    if (aToken) {
      getAllDoctors()
      
    }
  },[aToken])
  
  return (
    <div>DoctorsList</div>
  )
}

export default DoctorsList