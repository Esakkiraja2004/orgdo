const express = require('express');
const router = express.Router();
const authController = require('../controllers/loginControllers');  // Import the controller

// Route to render login page
router.get('/login', authController.renderInitialPage);  // Ensure renderLoginPage is defined

router.get('/userlogin', authController.renderUserLoginPage);

router.get('/hospitallogin', authController.renderHospitalLoginPage);

router.get('/hospital-signup', authController.renderHospitalRegisterPage);

module.exports = router;

 