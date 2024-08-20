// schema.js
const Joi = require('joi');

// Importing joi-password and extending Joi with its functionality
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

// Example schema for validating generate otp input
const generateOTPSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address.").required().messages({ 'any.required': 'An email address is required to generate an OTP.' })
});

// Example schema for validating login admin input
const loginAdminSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address.").required().messages({ 'any.required': 'An email address is required.' }),
    password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .messages({
            "password.minOfUppercase":
                "password should contain at least {#min} uppercase character",
            "password.minOfSpecialCharacters":
                "password should contain at least {#min} special character",
            "password.minOfLowercase":
                "password should contain at least {#min} lowercase character",
            "password.minOfNumeric":
                "password should contain at least {#min} numeric character",
            "password.noWhiteSpaces": "password should not contain white spaces",
            "password.min": "password length must be password",
        })
});

// Example schema for validating verify otp input
const verifyOTPSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address.").required().messages({ 'any.required': 'An email address is required.' }),
    otp: Joi.number()
        .integer()
        .min(1000)
        .max(9999)
        .required()
        .messages({
            'number.base': 'OTP must be a number.',
            'number.integer': 'OTP must be an integer.',
            'number.min': 'OTP must be a 4-digit number.',
            'number.max': 'OTP must be a 4-digit number.',
            'any.required': 'OTP is required.'
        })
});

// Example schema for validating login pin input
const loginPinSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address.").required().messages({ 'any.required': 'An email address is required.' }),
    pin: Joi.string().length(4).pattern(/^\d+$/)
});

// Example schema for validating verify otp input
const signupWithVerifiedEmailSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name must be at least 1 character long.',
            'string.max': 'Name cannot exceed 100 characters.',
            'any.required': 'Name is required.'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address.").required().messages({ 'any.required': 'An email address is required.' }),
});

// Example schema for validating verify otp input
const signupWithVerifiedEmailPinSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.min': 'Name must be at least 1 character long.',
            'string.max': 'Name cannot exceed 100 characters.',
            'any.required': 'Name is required.'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address.").required().messages({ 'any.required': 'An email address is required.' }),
    pin: Joi.string().length(4).pattern(/^\d+$/)
});


const resetPinSchema = Joi.object({
    new_pin: Joi.string().length(4).pattern(/^\d+$/),
    confirm_pin: Joi.string().length(4).pattern(/^\d+$/),
});

// Example schema for validating user input
const userSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } })
        .message("Please provide a valid email address."),
    password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .messages({
            "password.minOfUppercase":
                "password should contain at least {#min} uppercase character",
            "password.minOfSpecialCharacters":
                "password should contain at least {#min} special character",
            "password.minOfLowercase":
                "password should contain at least {#min} lowercase character",
            "password.minOfNumeric":
                "password should contain at least {#min} numeric character",
            "password.noWhiteSpaces": "password should not contain white spaces",
            "password.min": "password length must be password",
        })
});

module.exports = {
    userSchema,
    generateOTPSchema,
    verifyOTPSchema,
    signupWithVerifiedEmailSchema,
    signupWithVerifiedEmailPinSchema,
    loginPinSchema,
    resetPinSchema,
    loginAdminSchema
};
