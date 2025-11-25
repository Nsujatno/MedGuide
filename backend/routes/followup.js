const router = require('express').Router();
const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
    symptomsStatus: { 
        type: String, 
        enum: ['Improving', 'Same', 'Worsening'], 
        required: true 
    },
    takingMedication: { type: Boolean, required: true },
    sideEffects: { type: Boolean, required: true },
    sideEffectsList: { type: String, default: '' },
    sideEffectsSeverity: { 
        type: String, 
        enum: ['Mild', 'Moderate', 'Severe', ''], 
        default: '' 
    },
    dosesCount: { type: Number, default: 0 },
    missedDoses: { type: Boolean, required: true },
    missedDosesCount: { type: String, default: '' },
    difficultyRemembering: { type: Boolean, required: true },
    medicalCare: { type: Boolean, required: true },
    dietChange: { type: Boolean, required: true },
    medicineFormEasy: { type: Boolean, required: true },
    clearInstructions: { type: Boolean, required: true },
    overallFeeling: { 
        type: String, 
        enum: ['Better', 'Same', 'Worse'], 
        required: true 
    },
    questions: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const FollowUp = mongoose.model('FollowUp', followUpSchema);

router.post('/create', async (req, res) => {
    try {
        const newFollowUp = new FollowUp(req.body);
        await newFollowUp.save();
        res.status(201).json({ message: 'Follow-up saved successfully', followUp: newFollowUp });
    } catch (error) {
        console.error("Error saving follow-up:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const results = await FollowUp.find().sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const follow = await FollowUp.findById(req.params.id);
        if (!follow) {
            return res.status(404).json({ message: 'Survey not found' });
        }
        res.status(200).json(follow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
