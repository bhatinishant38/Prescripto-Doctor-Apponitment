import validator from "validator";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";


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
  const { userId } = req.body;
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

export const updatingUserdata = async ()=>{
  try {
    const { userId , name ,phone , gender ,dob ,address } = req.body
    const imageFile = req.file
    if(!name || !phone || gender || !dob || !address ){
      res.json({success:false ,message : "Data missing"})
    }
    await userModel.findByIdAndUpdate(userId ,{name ,phone,gender ,dob ,address:JSON.parse(address)})
    if(imageFile){
      const imageFile = cloudinary.uploader.upload(imageFile.path ,{resource_type:image} )
      const imageUrl = (await imageFile).secure_url
      await userModel.findByIdAndUpdate(userId ,{image:imageUrl})
    }  
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });   
  }
}
