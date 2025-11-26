const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {  
        type: String,
        required: true,
        trim: true
    },
    lastName: {  
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ["male", "female", "other"]
    },
    isPregnant: {
        type: Boolean,
        default: false
    },
    stressLevel: {
        type: String,
        enum: ["low", "moderate", "high"],
        default: "moderate"
    },
    allergies: {
        type: String
    },
    drugs: {
        type: Boolean, 
        default: false
    },
    alcohol: {
        type: Boolean,
        default: false
    },
    comfortableWithPills: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;  // CHANGED

        // Validate input
        if (!firstName || !lastName || !email || !password) {  // CHANGED
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists (only by email now)
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            firstName,  // CHANGED
            lastName,   // ADDED
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email },  // CHANGED
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            isOnboardingComplete: false,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,  
                lastName: newUser.lastName,     
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isOnboardingComplete = !!(user.weight && user.height && user.age);

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },  
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            isOnboardingComplete,
            user: {
                id: user._id,
                firstName: user.firstName,  
                lastName: user.lastName,     
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});


// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/onboarding', authenticateToken, async (req, res) => {
    try {
        const { 
            weight, height, age, gender, isPregnant,
            stressLevel, allergies, drugs, alcohol, comfortableWithPills 
        } = req.body;

        const updates = {};
        if (weight !== undefined) updates.weight = weight;
        if (height !== undefined) updates.height = height;
        if (age !== undefined) updates.age = age;
        if (gender !== undefined) updates.gender = gender;
        if (isPregnant !== undefined) updates.isPregnant = isPregnant;
        if (stressLevel !== undefined) updates.stressLevel = stressLevel;
        if (allergies !== undefined) updates.allergies = allergies;
        if (drugs !== undefined) updates.drugs = drugs;
        if (alcohol !== undefined) updates.alcohol = alcohol;
        if (comfortableWithPills !== undefined) updates.comfortableWithPills = comfortableWithPills;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Onboarding completed successfully',
            user
        });
    } catch (error) {
        console.error('Onboarding update error:', error);
        res.status(500).json({ message: 'Server error during onboarding' });
    }
});

router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, email, weight, height, age, gender, isPregnant,  
            stressLevel, allergies, drugs, alcohol, comfortableWithPills } = req.body;
        const updates = {};

        if (firstName) updates.firstName = firstName;  
        if (lastName) updates.lastName = lastName;     
        if (email) updates.email = email;
        if (weight !== undefined) updates.weight = weight;
        if (height !== undefined) updates.height = height;
        if (age !== undefined) updates.age = age;
        if (gender) updates.gender = gender;
        if (isPregnant !== undefined) updates.isPregnant = isPregnant;
        if (stressLevel) updates.stressLevel = stressLevel;
        if (allergies !== undefined) updates.allergies = allergies;
        if (drugs !== undefined) updates.drugs = drugs;
        if (alcohol !== undefined) updates.alcohol = alcohol;
        if (comfortableWithPills !== undefined) updates.comfortableWithPills = comfortableWithPills;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Account deletion error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
