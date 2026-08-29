import express from 'express'
import { getUserdata, loginUser, registerUser } from '../controllers/userController.js'
import { authUser } from '../middleware/userMiddleware.js'

export const userRouter = express.Router()

userRouter.post('/register' ,registerUser)
userRouter.post('/login' ,loginUser)
userRouter.get('/get-userData' ,authUser ,getUserdata)