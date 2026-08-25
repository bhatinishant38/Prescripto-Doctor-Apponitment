import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
    process.exit(1);
  }
};
