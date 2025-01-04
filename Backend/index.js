import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import addSettelment from "./route/stl.js"

const app = express()
// Configure CORS to allow requests from your frontend domain
app.use(
    cors({
      origin: "https://settelment-form-wcvt-rushikesh-gherades-projects.vercel.app", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
      credentials: true, // Include cookies if needed
    })
  );
app.use(express.json());
dotenv.config()

const PORT =process.env.PORT || 8080;
const URI=process.env.MONGO_URI;

try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connection done succefuly to db")
} catch (error) {
    console.log("Error:",error)
    
}

app.use("/settelment",addSettelment)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})