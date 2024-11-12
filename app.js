const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const loginRoutes = require('./routes/loginRoutes');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('./models/hospital'); // Import user model for authentication

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
 
// Connect to database
connectDB();

// Middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
  secret: 'your_secret_key', // Use a strong, secure secret key
  resave: false,
  saveUninitialized: false,
}));



// Initialize flash after session
app.use(flash());

// Initialize Passport and set up session
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use LocalStrategy with the userSchema's authentication method
passport.use(new LocalStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

// Routes
app.use('/', loginRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
