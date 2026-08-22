import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData , setUserData] = useState({
    name : "Edward Vincent",
    image : assets.profile_pic,
    email : "testExample@gamil.com",
    phone : "+1 123-456-7890",
    address : {
      line1 : "57th Cress , Richmond",
      line2 : "Circle, Church Road ,London"
    },
    gender : 'Male',
    dob : "@000-01-14"
  })

  const [isEdit , setIsEdit]  = useState(false)

  return (
    <div>
      
      <img src={userData.image} alt="" />
      {
        isEdit 
        ? <input type="text" value={userData.name} onChange={(e)=> setUserData(prev => ({...prev ,name: e.target.value}))} />
        : <p>{userData.name}</p>
      }
    </div>
  )
}

export default MyProfile