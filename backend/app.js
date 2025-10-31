const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;

require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
res.send('Hello, World!');
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error(err.message);
});

const surveyRouter = require('./routes/survey');
app.use('/api/survey', surveyRouter);
