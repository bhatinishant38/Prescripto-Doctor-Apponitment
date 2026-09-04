import express from 'express'
import { addDoctor, adminLogin, cancelAppointment, getAllAppointments, getAllDoctors } from '../controllers/adminController.js'
import { upload } from '../middleware/multer.js'
import { authAdmin } from '../middleware/authMiddleware.js'
import { changeAvailablity } from '../controllers/doctorController.js'


export const adminRouter = express.Router()

adminRouter.post('/add-doctors',authAdmin ,upload.single('image') , addDoctor)
adminRouter.post('/login' , adminLogin)
adminRouter.post('/all-doctors',authAdmin ,getAllDoctors)
adminRouter.post('/change-availablity',authAdmin ,changeAvailablity)
adminRouter.get('/get-appointments' ,authAdmin ,getAllAppointments)
adminRouter.post('cancel-appointments',authAdmin ,cancelAppointment)

