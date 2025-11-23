const router = require('express').Router();
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    length: { type: Number, required: true },
    hospitalization: { type: Boolean, required: true },
    dietchange: { type: Boolean, required: true },
    healthcondition: { type: [String], required: true },
    medications: { type: [String], required: true },
    pain: { type: [String], required: true },
    nausea: { type: Boolean, required: true },
    symptomstart: { type: Date, required: true },
    bodypart: { type: [String], required: true },
    budget: { type: Number, required: true },
    fever: { type: Boolean, required: true }

});

const Survey = mongoose.model('Survey', surveySchema);

router.post('/create', async (req, res) => {
    try {
        length = req.body.length;
        hospitalization = req.body.hospitalization;
        dietchange = req.body.dietchange;
        healthcondition = req.body.healthcondition;
        medications = req.body.medications;
        pain = req.body.pain;
        nausea = req.body.nausea;
        symptomstart = req.body.symptomstart;
        bodypart = req.body.bodypart;
        budget = req.body.budget;
        fever = req.body.fever;

        const newSurvey = new Survey({
            length,
            hospitalization,
            dietchange,
            healthcondition,
            medications,
            pain,
            nausea,
            symptomstart,
            bodypart,
            budget,
            fever
        });

        await newSurvey.save();
        res.status(201).json({ message: 'Survey created successfully', survey: newSurvey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json(surveys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        res.status(200).json(survey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;