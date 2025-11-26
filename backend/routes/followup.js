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

const followUpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
        required: false  
    },
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
    questions: { type: String, default: '' }
}, { 
    timestamps: true  
});

const FollowUp = mongoose.model('FollowUp', followUpSchema);

router.post('/create', authenticateToken, async (req, res) => {
    try {
        const newFollowUp = new FollowUp({
            userId: req.user.id,  
            ...req.body
        });
        await newFollowUp.save();
        res.status(201).json({ message: 'Follow-up saved successfully', followUp: newFollowUp });
    } catch (error) {
        console.error("Error saving follow-up:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const results = await FollowUp.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const follow = await FollowUp.findOne({
            _id: req.params.id,
            userId: req.user.id  
        });
        
        if (!follow) {
            return res.status(404).json({ message: 'Follow-up not found' });
        }
        
        res.status(200).json(follow);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/count', authenticateToken, async (req, res) => {
    try {
        const count = await FollowUp.countDocuments({ userId: req.user.id });
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const followUp = await FollowUp.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        
        if (!followUp) {
            return res.status(404).json({ message: 'Follow-up not found' });
        }
        
        res.status(200).json({ message: 'Follow-up deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
