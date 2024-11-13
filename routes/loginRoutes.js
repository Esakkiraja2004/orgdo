const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const Hospital = require('../models/hospital');
const passport = require('passport');

// Home route
router.get('/', catchError((req, res) => {
    res.render('main/initial');
}));

// Hospital login page
router.get('/hospital-login', catchError((req, res) => {
    res.render('main/hoslogin');
}));

// Handle hospital login with Passport.js
router.post('/hospital-login', 
    passport.authenticate('local', {
        successRedirect: '/hospital/dashboard',
        failureRedirect: '/hospital-login',
        failureFlash: true
    })
); 

// User login page
router.get('/user-login', catchError((req, res) => {
    res.render('main/userLogin');
}));

// Hospital signup page
router.get('/hospital-signup', catchError((req, res) => {
    res.render('main/hosReg');
}));

// Handle hospital signup POST request
router.post('/hospital-signup', catchError(async (req, res) => {
    try {
        const { hospitalId, hospitalName, email, password } = req.body;

        // Create a new hospital instance without the password
        const hospitalData = new Hospital({ hospitalId, hospitalName, email });

        // Register the hospital with the password
        await Hospital.register(hospitalData, password);
        // Flash success message and redirect
        req.flash('success', 'Hospital registration successful!');
        res.redirect('/hospital/dashboard');
    } catch (e) {
        console.error("Registration Error:", e.message);
        req.flash('error', `Registration failed: ${e.message}`);
        res.redirect('/hospital-signup');
    }
}));

router.get('/hospital/dashboard' , (req, res) => {
    res.render('main/hospitalDashboard');
})

module.exports = router;
