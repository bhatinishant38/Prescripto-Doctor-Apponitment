import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { doctorModel } from "../models/doctorModel.js"

// API for changing doctor's Availability


export const changeAvailablity = async (req, res)=>{
    const {docId} = req.body

    try {
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId ,{available: !docData.available})
        res.json({success : true ,message : "Availability Changed"})
        
    } catch (error) {
         console.log(error)
          res.json({success : false , message: error.message})    
    }
}

export const fetchAllDoctors = async (req,res)=>{
     try {
        const allDoctors = await doctorModel.find({}).select(['-password' ,'-email'])
        res.json({success: true , allDoctors})     
     } catch (error) {
        res.json({success :false ,message: error.message})
     }
}


// API for doctor login in admin panel

export const doctorLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            res.json({success:false, message : 'Invalid credatials'})
        }
        const isPasswordMatch = bcrypt.compare(password,doctor.password)
        if(isPasswordMatch){
            const token = jwt.sign({id: doctor._id},process.env.JWT_SECRET_KEY)
            res.json({success: true ,token})
        }else{
            res.json({success:false ,message : 'Inavlid credatials'})
        }
        
    } catch (error) {
        console.log(error)
         res.json({success :false ,message: error.message})
        
    }

}