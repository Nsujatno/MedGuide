const router = require('express').Router();
const mongoose = require('mongoose');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

const surveySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    recentHospitalizations: { type: Boolean, required: true }
}, { 
    timestamps: true  
});

const Survey = mongoose.model('Survey', surveySchema);

router.post('/create', authenticateToken, async (req, res) => {
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
            userId: req.user.id, 
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

router.get('/', authenticateToken, async (req, res) => {
    try {
        const surveys = await Survey.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        res.status(200).json(surveys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const survey = await Survey.findOne({
            _id: req.params.id,
            userId: req.user.id  
        });
        
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        res.status(200).json(survey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/count', authenticateToken, async (req, res) => {
    try {
        const count = await Survey.countDocuments({ userId: req.user.id });
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const survey = await Survey.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        
        res.status(200).json({ message: 'Survey deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
