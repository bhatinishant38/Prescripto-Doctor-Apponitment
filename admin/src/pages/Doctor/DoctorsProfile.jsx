import React, { useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";


const DoctorsProfile = () => {
  const { dToken, getDoctorProfileData, doctorProfileData ,setDoctorProfileData,backendUrl} =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async ()=>{
    try {
      const updateData ={
        address : doctorProfileData.address,
        fees : doctorProfileData.fees ,
        available : doctorProfileData.available
      }
      const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateData ,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
      }else{
        toast.error(data.message)
      }     
    } catch (error) {
      console.log(error)
      toast.error(data.message)  
      getDoctorProfileData()
    }
  }

  useEffect(() => {
    if (dToken) {
      getDoctorProfileData();
    }
  }, [dToken]);
  return (
    doctorProfileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={doctorProfileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {doctorProfileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {doctorProfileData.degree} - {doctorProfileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctorProfileData.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-175 mt-1">
                {doctorProfileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee :{" "}
              <span className="text-gray-800">
                {currency} {isEdit ? <input onChange={(e)=>setDoctorProfileData((prev)=>({...prev,fees: e.target.value}))} value={doctorProfileData.fees} type="number" />:doctorProfileData.fees}
              </span>
            </p>

            <div className="flex gap-2 py-2  ">
              <p>Address :</p>
              <p className="text-sm p-0.5">
                {isEdit ? <input onChange={(e)=>setDoctorProfileData(prev=> ({...prev, address: {...prev.address ,line1 : e.target.value}}))} type="text" value={doctorProfileData.address.line1}/>:doctorProfileData.address.line1}
                <br />
                {isEdit ? <input onChange={(e)=>setDoctorProfileData(prev=> ({...prev, address: {...prev.address ,line2 : e.target.value}}))} type="text" value={doctorProfileData.address.line2}/>:doctorProfileData.address.line2}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={(e)=>isEdit && setDoctorProfileData(prev=> ({...prev,available: !prev.available}))}
                checked={doctorProfileData.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorsProfile;
