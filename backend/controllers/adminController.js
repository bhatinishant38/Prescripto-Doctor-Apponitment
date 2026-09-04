import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { doctorModel } from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import { appointmentModel } from "../models/appointmentModel.js";
import { userModel } from "../models/userModel.js";

// Api for adding Doctor
export const addDoctor = async (req, res) => {
  
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      address,
      fees,
    } = req.body;
    const imageFile = req.file;
   
    console.log("file", imageFile);

    // checkin if all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !address ||
      !fees
    ) {
      return res.json({ success: false, message: "Missing details " });
    }

    //validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


// Api for admin login

export const adminLogin = (req, res)=>{

  try {
     const { email ,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password , process.env.JWT_SECRET_KEY)
      res.json({success : true , token})
    } else{
       res.json({success : false , message: "Invalid Credantials"})
    }

  } catch (error) {
    console.log(error)
     res.json({success : false , message: error.message})
  }

}


//Api for get all doctors from Database

export const getAllDoctors = async (req,res)=>{

  try {
      const allDoctors = await doctorModel.find({}).select('-password')
      res.json({success: true ,allDoctors})
    
  } catch (error) {
     console.log(error)
     res.json({success : false , message: error.message})
    
  }

}


// API to get All Appointments from database
export const getAllAppointments = async (req,res)=>{
  try { 
    const allAppointments = await appointmentModel.find({})
    res.json({success : true , allAppointments})   
  } catch (error) {
     console.log(error)
     res.json({success : false , message: error.message})    
  }
}


// API for appointment cancellation

export const cancelAppointment = async (req, res) => {
  try {
   
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

  
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slots
    const { docId, slotDate, slotTime } = appointmentData;

    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime,
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Api to get dashboard data for admin panel

export const adminDashboard = async (req,res)=>{
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors : doctors.length,
      appointments: appointments.length,
      patients : users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }
    res.json({success : true ,dashData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });    
  }
}