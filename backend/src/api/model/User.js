// Import required packages
const userTypeEnums = require('../enums/userType');
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '' },
  name: { type: String, default: '' },
  pin: { type: String, default: '' },
  deviceType: { type: String, default: '' },
  deviceToken: { type: String, default: '' },
  currentChildActive: { type: mongoose.Schema.Types.ObjectId, ref: 'child' },
  otp: { type: Number, default: null },
  otpVerification: { type: Boolean, default: false },
  otpExpireTime: { type: Number, default: null },
  pinChangedOtp: { type: Number, default: null },
  pinChangedOtpVerification: { type: Boolean, default: false },
  pinChangedOtpExpireTime: { type: Number, default: null },
  isCreatedWithOtpVerification: { type: Boolean, default: false },
  userType: { type: String, enum: [userTypeEnums.USER, userTypeEnums.ADMIN], default: userTypeEnums.USER },
  totalPoints: { type: Number, default: 0 },
  profilePic: { type: String, default: "" },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('users', userSchema);

// Export User model
module.exports = User;
