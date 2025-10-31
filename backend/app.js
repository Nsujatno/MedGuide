/*import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserModel from "./userSchema.js";
import postRoutes from "./postRequests.js"; // import app routes
import userRouter from "./userRoutes.js"; //import user routes
import onboardingRouter from "./routes/onboarding.js"*/

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserModel = require("./userSchema.js");
const postRoutes = require("./postRequests.js");
const userRouter = require("./userRoutes.js");


dotenv.config();
//temporary debugging
console.log("MONGO_URL from .env:", process.env.MONGO_URL);
const app = express();

//reading JSON in post requests
app.use(express.json());

// use your routes under a base path
// app.use("/api", postRoutes);

// tell Express to use the user router for anything starting with /users
// app.use("/users", userRouter);

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

//test if it is connecting
console.log("Connecting to:", MONGOURL);

mongoose
    .connect(MONGOURL)
    .then(()=>
    {
    console.log("Database is connected successfully.");
    
    app.listen(PORT,()=>
    {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}) 
.catch((error)=> console.log(error));

//define onboarding router
const onboardingRouter = require('./routes/onboarding');

//tell app to use this endpoint
app.use('/api/onboarding', onboardingRouter);

// //default route
app.get('/', (req, res) => {
res.send('Hello, World!');
});

//tells server what to do
// app.get("/getUsers", async(req, res)=>
// {
//     try {
//     const userData = await UserModel.find();
//     res.json(userData);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// });