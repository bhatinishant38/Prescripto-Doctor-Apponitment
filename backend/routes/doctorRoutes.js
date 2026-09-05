
import express from 'express'
import { doctorLogin, fetchAllDoctors, getDoctorAppointments } from '../controllers/doctorController.js'
import { authDoctor } from '../middleware/authDoctor.js'

export const doctorRouter = express.Router()

doctorRouter.get('/list' ,fetchAllDoctors)
doctorRouter.post('/doctor-login',doctorLogin)
doctorRouter.get('/get-appointments',authDoctor,getDoctorAppointments)