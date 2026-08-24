import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URI }/prescripto`).then(()=>{
        console.log('DB Connected')
    })
}