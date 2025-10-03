/*const express = require('express');
const app = express();
const PORT = 3000; */
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserModel from "./userSchema.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.get('/', (req, res) => {
res.send('Hello, World!');
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
    .connect(MONGOURL)
    .then(()=>
    {
    console.log("Database is connected successfully.");
    app.listen(PORT,()=>
    {
        //needs ` instead of "" because of {PORT} to print acc value
        console.log(`Server is running on port ${PORT}`);
    });
}) 
.catch((error)=> console.log(error));

//tells server what to do
app.get("/getUsers", async(req, res)=>
{
    //tells mongoDB to get all user documents
    const userData = await UserModel.find();
    //sends data back to client
    res.json(userData);
});