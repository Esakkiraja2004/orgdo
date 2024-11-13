const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const loginRoutes = require('./routes/loginRoutes');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const Hospital = require('./models/hospital'); // Import hospital model for authentication

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong, secure secret key from .env
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize flash after session
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(Hospital.createStrategy());
passport.serializeUser(Hospital.serializeUser());
passport.deserializeUser(Hospital.deserializeUser());

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  res.locals.currentUser = req.user; // Optional: make the logged-in user available in templates
  next();
});

// Routes
app.use('/', loginRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
