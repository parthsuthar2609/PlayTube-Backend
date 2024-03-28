import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// Cors Are Cross-Origin Resourses Sharing.
app.use(cors({
    origin: process.env.CORS_ORIGIN,  //Which Spefic Origin Can Access The Resourese.
    credentials: true
}))
app.use(express.json({ limit: "25kb" }))  //This is Used When We deals with And Accept Json Data
app.use(express.urlencoded({ extended: true, limit: "10kb" })) //is Used For Space In URL And Encode The Url
app.use(express.static("public"))// This is Used When Deals with the File, Images ,,Pdfs
app.use(cookieParser);// Allows The User Browser Cookies For CURD Operation

//routes
import userRouter from "./routes/user.router.js"

app.use("api/v1/users",userRouter);

export { app }; //This is for Export