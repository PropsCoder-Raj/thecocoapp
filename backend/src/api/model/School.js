// Import required packages
const mongoose = require('mongoose');

// Define the school schema
const schoolSchema = new mongoose.Schema({
  schoolId: { type: Number, unique: true, default: 0 },
  email: { type: String, required: true },
  schoolName: { type: String, default: '' },
  address: { type: String, default: '' },
  phoneNumber: { type: Number, default: 0 },
  PrincipalName: { type: String, default: '' },
  logo: { type: String, default: '' },
}, { timestamps: true });

// Create the school model
const School = mongoose.model('schools', schoolSchema);

// Export school model
module.exports = School;
