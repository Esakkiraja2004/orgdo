// hospitalRoutes.js
const express = require('express');
const passport = require('passport');
const hospitalController = require('../controllers/hospitalControllers');

const router = express.Router();

// Registration route
router.post('/register', hospitalController.registerHospital);

// Login route
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), hospitalController.loginHospital);

// Protected route for dashboard
router.get('/dashboard', hospitalController.ensureAuthenticated, hospitalController.getDashboard);

// Logout route
router.get('/logout', hospitalController.logoutHospital);

module.exports = router;
