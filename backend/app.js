const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

require('dotenv').config();

app.use(express.json());

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
const userRouter = require('./routes/user');
const pharmacyRouter = require('./routes/pharmacy');
const followupRouter = require('./routes/followup');

//tell app to use this endpoint
app.use('/api/onboarding', onboardingRouter);
app.use('/api/survey', surveyRouter);
app.use('/api/user', userRouter);
app.use('/api/pharmacy', pharmacyRouter);
app.use('/api/followup', followupRouter);


// //default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});