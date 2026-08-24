import express from 'express'
import { addDoctor } from '../controllers/adminController.js'
import { upload } from '../middleware/multer.js'


export const adminRouter = express.Router()

adminRouter.post('/add-doctors', upload.single('image') , addDoctor)

