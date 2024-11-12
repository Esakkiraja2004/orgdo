const express = require('express');
const router = express.Router();
const catchError = require('../utils/catchError');
const hospitalSchema = require('../models/hospital');
const passport = require('passport');

// Home route
router.get('/', catchError((req, res) => {
    res.render('main/initial');
}));

// Hospital login page
router.get('/hospital-login', catchError((req, res) => {
    res.render('main/hoslogin');
}));

router.post('/hospital-login', passport.authenticate('local', {successRedirect: '/hospital/dashboard',failureRedirect: '/hospital-login',failureFlash: true }) ,(req,res) => {
    req.flash('success','Successfully logged in')
    res.redirect('/hospital/dashboard');
});


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
        const hospitalData = new hospitalSchema({ hospitalId, hospitalName, email });

        // Register the hospital with the password
        await hospitalSchema.register(hospitalData, password);

        // Flash success message and redirect
        req.flash('success', 'Hospital registration successful!');
        res.redirect('/hospital/dashboard');
    } catch (e) {
        // Log the exact error for debugging
        console.error("Registration Error:", e.message);
        
        // Flash error message
        req.flash('error', `Registration failed: ${e.message}`);
        res.redirect('/hospital-signup');
    }
}));

// Hospital dashboard route
router.get('/hospital/dashboard', catchError(async (req, res) => {
    // Fetch the hospital data from the database
    const hospital = await hospitalSchema.findById(req.user._id);  // Use findOne() if there's only one hospital
    console.log(hospital)
    
    if (!hospital) {
        return res.status(404).send("Hospital not found.");
    }

    // Pass the hospitalName along with other data to the template
    res.render('main/hospitalDashboard', { 
        hospitalName: hospitalSchema.hospitalName, // Assuming hospitalName is part of your schema
        data: hospital // You can also pass the whole hospital data if needed
    });
}));



module.exports = router;
