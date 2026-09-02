import validator from "validator";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { doctorModel } from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";

// API for user sign up

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.json({ success: false, message: "Enter your details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter correct email" });
    }

    if (password.length <= 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ success: false, message: "invalid credantails" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for fetching user profile data

export const getUserdata = async (req, res) => {
  const userId = req.userId;
  try {
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "user does not exist" });
    }
    return res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for updating user data

export const updatingUserdata = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, gender, dob, address } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !gender || !dob || !address) {
      res.json({ success: false, message: "Data missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      gender,
      dob,
      address: JSON.parse(address),
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      console.log(imageUrl);
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Api for booking appointments

export const bookAppointment = async (req,res)=>{

  const userId = req.userId
  const {docId ,slotDate, slotTime} = req.body

  const docData = await doctorModel.findById(docId).select('-password')
  
  if(!docData.available){
    res.json({success:false , message : "Doctor not available"})
  }
  let slots_booked = docData.slots_booked

  //checking for slot availability
  if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime)){
      res.json({success :false , message :"Slot is not available"})
    }else{
      slots_booked[slotDate].push(slotTime)
    }
  }else{
    slots_booked[slotDate] = []
    slots_booked[slotDate].push(slotTime)
  }

  const userData = await userModel.findById(userId).select('-password')

  // delteing slots_booked data from docdata because we not send want to store booking data in user apponitment data
  delete docData.slots_booked

  const appointmentData = {
    userId,
    docId,
    userData,
    docData,
    amount : docData.fees,
    slotTime,
    slotDate,
    date : Date.now()

  }

  const newAppointment = new appointmentModel(appointmentData)
   await newAppointment.save()

   // save new slots data in doctors

   await doctorModel.findByIdAndUpdate(docId,{slots_booked})
   res.json({success : true ,message : "Appointment Booked"})

}


// Api to get Appointments

export const getAppointmentlist = async (req,res)=>{
   try {
    const userId = req.userId
    const appointmentList = await appointmentModel.find({userId})
    res.json({success : true ,appointmentList})  
   } catch (error) {
    console.log(error)
    res.json({success: false, message:error.message})    
   }
}


// API to cancel Apponitment

export const cancelAppointment = async (req,res)=>{

  try {
    const userId = req.userId
    const {appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    // checking that the appointment data is of same user
    if(appointmentData.userId !== userId){
      return res.json({success:false ,message : "Unauthorized action"})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled : true})


    // releasing doctor slots
    const {docId ,slotDate ,slotTime} = appointmentData

    const docData = await doctorModel.findById(docId)

    let slots_booked = docData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e!== slotTime)

   await doctorModel.findByIdAndUpdate(docId ,{slots_booked})
   res.json({success : true ,message : "Appointment Cancelled"})
    
  } catch (error) {
    console.log(error)
    res.json({success: false, message:error.message})  
  }

}