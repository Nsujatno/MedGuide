const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 8000;

const Survey = require('./schemas/surveySchema');

app.use(express.json());

app.get('/', (req, res) => {
res.send('Hello, World!');
});

// app.listen(PORT, () => {
// console.log(`Server is running on http://localhost:${PORT}`);
// });

const connectDB = async () => {
    try {
        await mongoose.connect('');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

const surveyRouter = require('./routes/survey');
app.use('/api/survey', surveyRouter);
