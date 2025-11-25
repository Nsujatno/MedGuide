const router = require('express').Router();
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    symptoms: { type: [String], required: true },
    symptomSeverities: { type: Map, of: Number, default: {} }, 
    otherSymptoms: { type: String, default: '' },
    symptomsStartDate: { type: Date, required: true }, 
    symptomsLocation: { type: String, required: true },
    overallSeverity: { type: String, required: true },
    hasPain: { type: Boolean, required: true },
    painSeverity: { type: Number, default: 0 },
    painLocation: { type: String, default: '' },
    healthConditions: { type: [String], default: [] },
    healthConditionsOther: { type: String, default: '' },
    currentConditions: { type: [String], default: [] },
    currentConditionsOther: { type: String, default: '' },
    dietChanges: { type: Boolean, required: true },
    medications: { type: String, default: '' },
    recentHospitalizations: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Survey = mongoose.model('Survey', surveySchema);

router.post('/create', async (req, res) => {
    try {
        const {
            symptoms,
            symptomSeverities,
            otherSymptoms,
            symptomsStartDate,
            symptomsLocation,
            overallSeverity,
            hasPain,
            painSeverity,
            painLocation,
            healthConditions,
            healthConditionsOther,
            currentConditions,
            currentConditionsOther,
            dietChanges,
            medications,
            recentHospitalizations
        } = req.body;

        const newSurvey = new Survey({
            symptoms,
            symptomSeverities,
            otherSymptoms,
            symptomsStartDate,
            symptomsLocation,
            overallSeverity,
            hasPain,
            painSeverity,
            painLocation,
            healthConditions,
            healthConditionsOther,
            currentConditions,
            currentConditionsOther,
            dietChanges,
            medications,
            recentHospitalizations
        });

        await newSurvey.save();
        res.status(201).json({ message: 'Survey created successfully', survey: newSurvey });
    } catch (error) {
        console.error("Error saving survey:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const surveys = await Survey.find().sort({ createdAt: -1 });
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