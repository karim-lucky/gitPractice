import mongoose from "mongoose";



export const connectDb = () => {
  console.log("DB connected");

  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/test").then((connect) => {
    console.log(connect);
    console.log("MongoDB connected");


  }).catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  
}