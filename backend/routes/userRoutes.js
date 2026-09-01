import express from 'express'
import { bookAppointment, getAppointmentlist, getUserdata, loginUser, registerUser, updatingUserdata } from '../controllers/userController.js'
import { authUser } from '../middleware/userMiddleware.js'
import { upload } from '../middleware/multer.js'

export const userRouter = express.Router()

userRouter.post('/register' ,registerUser)
userRouter.post('/login' ,loginUser)
userRouter.get('/get-profile' ,authUser ,getUserdata)
userRouter.post('/update-profile',authUser,upload.single('image') ,updatingUserdata)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/get-appointment',authUser,getAppointmentlist)