import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { doctorModel } from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";

// API for changing doctor's Availability

export const changeAvailablity = async (req, res) => {
  const { docId } = req.body;

  try {
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

export const fetchAllDoctors = async (req, res) => {
  try {
    const allDoctors = await doctorModel
      .find({})
      .select(["-password", "-email"]);
    res.json({ success: true, allDoctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for doctor login in admin panel

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({ success: false, message: "Invalid credatials" });
    }
    const isPasswordMatch = bcrypt.compare(password, doctor.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Inavlid credatials" });
    }
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointment of a single doctor in doctor panel

export const getDoctorAppointments = async (req, res) => {
  try {
    const docId = req.docId;
    // console.log(docId)
    if (docId) {
      const appointments = await appointmentModel.find({ docId });
      // console.log(appointments)
      res.json({ success: true, appointments });
    } else {
      res.json({ success: false, message: "Not Authorized login again" });
    }
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment completed for doctor panel

export const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

// API to camcel appointmentfor doctor panel

export const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Canceled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

// Api for get Dahsboard for doctor panel

export const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashboardData = {
      earnings,
      appointmentsNumber: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

// API for get profile doctor profile data

export const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const doctorProfileData = await doctorModel.findById(docId);
    res.json({ success: true, doctorProfileData });
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};

// API for updating doctor profile data

export const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { address, fees, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { address, fees, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    // console.log(error)
    res.json({ success: false, message: error.message });
  }
};
