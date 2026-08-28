
import express from 'express'
import { fetchAllDoctors } from '../controllers/doctorController.js'

export const doctorRouter = express.Router()

doctorRouter.get('/list' ,fetchAllDoctors)