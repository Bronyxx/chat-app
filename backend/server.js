import express from "express";
const app= express();
import authRouter from "./src/routes/auth.router.js";
import {ENV} from "./src/lib/env.js";
// dotenv.config();
import {connectDB} from "./src/lib/db.js"
const PORT=ENV.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRouter);

app.listen(PORT,()=>{
    console.log("server is running at port "+ PORT);
    connectDB();
})