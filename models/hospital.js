// models/Hospital.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalId: { type: String, required: true, unique: true },
    hospitalName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// Add Passport-Local Mongoose plugin to handle password hashing and registration
hospitalSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Hospital', hospitalSchema);
