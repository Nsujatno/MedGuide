const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

require('dotenv').config();

app.use(express.json());

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// use your routes under a base path
// app.use("/api", postRoutes);

// tell Express to use the user router for anything starting with /users
// app.use("/users", userRouter);
const MONGOURL = process.env.MONGO_URL;

//test if it is connecting
console.log("Connecting to:", MONGOURL);

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Database is connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(error));

//define onboarding router
const onboardingRouter = require('./routes/onboarding');
const surveyRouter = require('./routes/survey');

//tell app to use this endpoint
app.use('/api/onboarding', onboardingRouter);
app.use('/api/survey', surveyRouter);


// //default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});