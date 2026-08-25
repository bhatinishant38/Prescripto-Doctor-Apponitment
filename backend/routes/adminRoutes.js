import express from 'express'
import { addDoctor, adminLogin } from '../controllers/adminController.js'
import { upload } from '../middleware/multer.js'
import { authAdmin } from '../middleware/authMiddleware.js'


export const adminRouter = express.Router()

adminRouter.post('/add-doctors',authAdmin ,upload.single('image') , addDoctor)

adminRouter.post('/login' , adminLogin)

