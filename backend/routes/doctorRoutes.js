
import express from 'express'
import { doctorLogin, fetchAllDoctors } from '../controllers/doctorController.js'

export const doctorRouter = express.Router()

doctorRouter.get('/list' ,fetchAllDoctors)
doctorRouter.post('/doctor-login',doctorLogin)