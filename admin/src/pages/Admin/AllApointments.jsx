import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AllApointments = () => {

  const {aToken , appointments , getAllAppointments} = useContext(AdminContext)

  useContext(()=>{
    if(aToken){
      getAllAppointments()
    } 
  },[aToken])
  
  return (
    <div>AllApointments</div>
  )
}

export default AllApointments