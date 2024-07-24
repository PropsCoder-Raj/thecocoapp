// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
var jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const emailTemplates = require('./emailTemplates');
const otpGenerator = require('otp-generator');
var { SendMailClient } = require("zeptomail");

const sendMailUsingZepto = async (toEmail, subject, htmlBody) => {
    const url = "api.zeptomail.in/";
    const token = "Zoho-enczapikey " + process.env.zepto_secret;
    let client = new SendMailClient({ url, token });
    return await client.sendMail({
        "from":
        {
            "address": "hello@thecocoapp.com",
            "name": "Cocoapp"
        },
        "to":
            [
                {
                    "email_address":
                    {
                        "address": toEmail
                    }
                }
            ],
        "subject": subject,
        "htmlbody": htmlBody,
    });
}

// Function to generate JWT token
exports.generateJWT = async (payload) => {
    // Generate JWT token with payload and secret key, set expiration time to 24 hours
    return await jwt.sign(payload, process.env.jwtsecret, { expiresIn: "24h" })
}

exports.updateCurrentStatus = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            array[i].current_status = !array[i].complete_status;
        } else {
            array[i].current_status = array[i - 1].complete_status;
        }

        if (array[i].current_status === true && array[i].complete_status === true) {
            array[i].current_status = false;
        }
    }
}


exports.generateOTP = () => {
    return otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
}

// Function to upload image to Cloudinary
exports.uploadImageCloudinary = async (url) => {
    // Configure Cloudinary with your credentials from environment variables
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    });

    // Upload url image to Cloudinary and return the secure URL
    return (await cloudinary.uploader.upload(url)).secure_url
}

exports.sendPinChangedGenerateOTPMail = async (email, otp) => {
    let html = emailTemplates.pinChangedGenerateOTP(otp);
    return await sendMailUsingZepto(email, "OTP for PIN Change Verification", html);
    // var transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         "user": "panditrohit532@gmail.com",
    //         "pass": "sajutseiqfrgitkm"
    //     }
    // });
    // var mailOptions = {
    //     from: "panditrohit532@gmail.com",
    //     to: email,
    //     subject: "OTP for PIN Change Verification",
    //     html: html,
    // };
    // return await transporter.sendMail(mailOptions);
}

exports.sendSignupGenerateOTPMail = async (email, otp) => {
    let html = emailTemplates.signupGenerateOTP(otp);
    return await sendMailUsingZepto(email, "Verify Your Account", html);
    // var transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         "user": "panditrohit532@gmail.com",
    //         "pass": "sajutseiqfrgitkm"
    //     }
    // });
    // var mailOptions = {
    //     from: "panditrohit532@gmail.com",
    //     to: email,
    //     subject: "Verify Your Account",
    //     html: html,
    // };
    // return await transporter.sendMail(mailOptions);
}

exports.sendLoginGenerateOTPMail = async (email, otp) => {
    let html = emailTemplates.loginGenerateOTP(otp);
    return await sendMailUsingZepto(email, "Your OTP for Login", html);
    // var transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         "user": "panditrohit532@gmail.com",
    //         "pass": "sajutseiqfrgitkm"
    //     }
    // });
    // var mailOptions = {
    //     from: "panditrohit532@gmail.com",
    //     to: email,
    //     subject: "Your OTP for Login",
    //     html: html,
    // };
    // return await transporter.sendMail(mailOptions);
}
