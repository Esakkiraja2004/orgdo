// hospitalController.js
const Hospital = require('../models/Hospital');
const bcrypt = require('bcrypt');

// Register a new hospital
exports.registerHospital = async (req, res) => {
    const { hospitalId, hospitalName, email, password } = req.body;

    try {
        // Check if hospitalId or email already exists
        const existingHospital = await Hospital.findOne({ $or: [{ hospitalId }, { email }] });
        if (existingHospital) {
            return res.status(400).json({ message: 'Hospital ID or Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new hospital document
        const newHospital = new Hospital({
            hospitalId,
            hospitalName,
            email,
            password: hashedPassword
        });

        await newHospital.save();
        res.status(201).json({ message: 'Hospital registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering hospital', error });
    }
};

// Login hospital (handled by Passport middleware, but we can respond if needed)
exports.loginHospital = (req, res) => {
    res.status(200).json({ message: 'Login successful', hospital: req.user });
};

// Ensure hospital is authenticated
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Please log in to access this resource' });
};

// Get the hospital dashboard
exports.getDashboard = (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Hospital Dashboard',
        hospital: req.user
    });
};

// Logout hospital
exports.logoutHospital = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};
