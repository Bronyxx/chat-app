import express from "express";
const app= express();
import authRouter from "./src/routes/auth.router.js";
import dotenv from"dotenv";
dotenv.config();
import {connectDB} from "./src/lib/db.js"
const PORT=process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRouter);

app.listen(PORT,()=>{
    console.log("server is running at port "+ PORT);
    connectDB();
})