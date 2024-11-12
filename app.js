const express = require('express');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./api/routes/authRouters');

const flash = require('connect-flash');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration (required for handling user sessions)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', authRoutes);

// Initialize connect-flash
// app.use(flash());

// // Make flash messages available in all views
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next();
// });

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
 