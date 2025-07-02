import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRouter from "./router/user.route.js";
import ProfileRouter from "./router/profile.route.js"
import AdmissionRouter from "./router/admission.route.js";
import collebrativeRouter from "./router/collebrative.route.js";
import contactRouter from "./router/contact.route.js";
import CourseRouter from "./router/course.route.js";
import batchRoutes from "./router/batch.route.js";
import dotenv from "dotenv";
import Course from "./model/course.model.js";
 import cors from "cors";
 import path from "path";
 import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database connected");

        // Middleware
        app.use(cors({
            origin:"http://localhost:3000",
            credentials:true,
        }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));


      app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        app.use("/user", UserRouter);
        app.use("/profile",ProfileRouter);
        app.use("/admission", AdmissionRouter);
        app.use("/collebrative", collebrativeRouter); 
        app.use("/contact",contactRouter);
        app.use("/",CourseRouter);
        app.use("/batch", batchRoutes);

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server started at port " + (process.env.PORT || 5000));
        });
    })
    .catch(err => {
        console.log("Database connection failed..", err);
    });
