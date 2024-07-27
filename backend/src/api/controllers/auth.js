const mongoose = require('mongoose');

const { userServices } = require("../service/users")
const { createUser, findUser, updateUser } = userServices;

const { newUserServices } = require("../service/newusers")
const { findNewUser, createNewUser, updateNewUser } = newUserServices;

const commonFunction = require("../helper/utils");
const userTypeEnums = require("../enums/userType");

const bcrypt = require("bcrypt");

/**
* @swagger
* /auth/signup/generate-otp:
*   post:
*     summary: Generate OTP when user is signed up
*     tags:
*       - User Authentication
*     description: Generate OTP when user is signed up
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_generate_otp_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.signupGenerateOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await findNewUser({ email: email });
        const otp = await commonFunction.generateOTP();
        const otpExpireTime = new Date().getTime() + 180000;

        if (existingUser) {
            if (existingUser.otpVerification) {
                return res.status(409).send({ status: false, message: "Email already exists" });
            }

            await commonFunction.sendSignupGenerateOTPMail(email, otp);
            await updateNewUser({ _id: existingUser._id }, { otp, otpExpireTime });

            return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
        }

        await commonFunction.sendSignupGenerateOTPMail(email, otp);
        await createNewUser({ email, otp, otpExpireTime });

        return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/signup/verify-otp:
*   post:
*     summary: Verify OTP when user is signed up
*     tags:
*       - User Authentication
*       - User Authentication With Pin
*     description: Verify OTP when user is signed up
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_verify_otp_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.signupVerifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const existingUser = await findUser({ email: email });
        if (!existingUser) {
            return res.status(400).send({ status: false, message: "Email not registerd." });
        }

        if (existingUser.otpVerification == true) {
            return res.status(200).send({ status: true, message: "OTP already verified.", email: email });
        }

        if (existingUser.otp != otp) {
            return res.status(400).send({ status: false, message: "OTP not matched." });
        }

        // Check if the OTP has expired
        if (new Date().getTime() > existingUser.otpExpireTime) {
            return res.status(410).send({ status: false, message: "OTP has expired." });
        }

        
        let user = await updateUser({ _id: existingUser._id }, { otpVerification: true, isCreatedWithOtpVerification: true });
        const token = await commonFunction.generateJWT({ email: email, id: user._id });
        user.pin = undefined;
        return res.status(200).send({ status: true, message: "OTP verified successfully.", user, token });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/signup-with-verfied-email:
*   post:
*     summary: Sign up with verified email
*     tags:
*       - User Authentication
*     description: Endpoint for user signup using a verified email. The user must provide an email and OTP for verification.
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_signup_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.signupWithVerifiedEmail = async (req, res, next) => {
    try {
        const { email, name } = req.body;

        const existingUser = await findUser({ email: email });
        const otp = await commonFunction.generateOTP();
        const otpExpireTime = new Date().getTime() + 180000;

        if (existingUser) {
            if (existingUser.otpVerification) {
                return res.status(409).send({ status: false, message: "Email already exists" });
            }

            await commonFunction.sendSignupGenerateOTPMail(email, otp);
            await updateUser({ _id: existingUser._id }, { otp, otpExpireTime });

            return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
        }

        await commonFunction.sendSignupGenerateOTPMail(email, otp);
        await createUser({ name, email, otp, otpExpireTime });
        return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/signup-with-verfied-email-pin:
*   post:
*     summary: Sign up with verified email - pin
*     tags:
*       - User Authentication With Pin
*     description: Endpoint for user signup using a verified email. The user must provide an email and OTP for verification.
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_signup_pin_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.signupWithVerifiedEmailPin = async (req, res, next) => {
    try {
        let { email, name, pin } = req.body;

        const existingUser = await findUser({ email: email });
        const otp = await commonFunction.generateOTP();
        const otpExpireTime = new Date().getTime() + 180000;

        pin = await bcrypt.hash(pin, 10);

        if (existingUser) {
            if (existingUser.otpVerification) {
                return res.status(409).send({ status: false, message: "Email already exists" });
            }

            await commonFunction.sendSignupGenerateOTPMail(email, otp);
            await updateUser({ _id: existingUser._id }, { otp, otpExpireTime });

            return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
        }

        await commonFunction.sendSignupGenerateOTPMail(email, otp);
        await createUser({ name, email, otp, otpExpireTime, pin });
        return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/login/generate-otp:
*   post:
*     summary: Generate OTP when user is login
*     tags:
*       - User Authentication
*     description: Generate OTP when user is login
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_generate_otp_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.loginGenerateOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await findUser({ email: email });
        if (!existingUser) {
            return res.status(400).send({ status: false, message: "Email not registerd." });
        }

        const otp = await commonFunction.generateOTP();
        const otpExpireTime = new Date().getTime() + 180000;
        await commonFunction.sendLoginGenerateOTPMail(email, otp);
        await updateUser({ _id: existingUser._id }, { otp, otpExpireTime });
        return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/login/verify-otp:
*   post:
*     summary: Verify OTP when user is login
*     tags:
*       - User Authentication
*     description: Verify OTP when user is login
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_verify_otp_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.loginVerifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const existingUser = await findUser({ email: email });
        if (!existingUser) {
            return res.status(400).send({ status: false, message: "Email not registerd." });
        }

        if (existingUser.otp != otp) {
            return res.status(400).send({ status: false, message: "OTP not matched." });
        }

        // Check if the OTP has expired
        if (new Date().getTime() > existingUser.otpExpireTime) {
            return res.status(410).send({ status: false, message: "OTP has expired." });
        }

        let user = await updateUser({ _id: existingUser._id }, { otpVerification: true });
        const token = await commonFunction.generateJWT({ email: email, id: user._id });
        user.pin = undefined;
        return res.status(200).send({ status: true, message: "User Login successfully.", user, token });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


/**
* @swagger
* /auth/login/email-with-pin:
*   post:
*     summary: login email with pin
*     tags:
*       - User Authentication With Pin
*     description: login email and pin
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_login_email_pin_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.loginEmailPin = async (req, res, next) => {
    try {
        const { email, pin } = req.body;

        const existingUser = await findUser({ email: email });
        if (!existingUser) {
            return res.status(400).send({ status: false, message: "Email not registerd." });
        }

        const pinStatus = await bcrypt.compare(pin, existingUser.pin)
        if (!pinStatus) {
            return res.status(400).send({ status: false, message: "Pin not matched." });
        }

        const token = await commonFunction.generateJWT({ email: email, id: existingUser._id });
        existingUser.pin = undefined;
        return res.status(200).send({ status: true, message: "User Login successfully.", user: existingUser, token });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/send-otp-for-set-pin:
*   post:
*     summary: send-otp-for-set-pin
*     tags:
*       - User Authentication With Pin
*     description: send-otp-for-set-pin
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_generate_otp_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.sendOtpForSetPin = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await findUser({ email: email });
        const pinChangedOtp = await commonFunction.generateOTP();
        const pinChangedOtpExpireTime = new Date().getTime() + 180000;

        if (!existingUser) {
            return res.status(404).send({ status: false, message: "User not found." });
        }

        await commonFunction.sendPinChangedGenerateOTPMail(email, pinChangedOtp);
        await updateUser({ _id: existingUser._id }, { pinChangedOtp, pinChangedOtpExpireTime, pinChangedOtpVerification: false });
        return res.status(200).send({ status: true, message: "OTP sent successfully.", email: email });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /auth/verify-otp-for-pin-change:
*   post:
*     summary: verify-otp-for-pin-change
*     tags:
*       - User Authentication With Pin
*     description: verify-otp-for-pin-change
*     produces:
*       - application/json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/user_verify_otp_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.verifyOtpForPinChange = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const existingUser = await findUser({ email: email });
        if (!existingUser) {
            return res.status(400).send({ status: false, message: "Email not registerd." });
        }

        if (existingUser.pinChangedOtp != otp) {
            return res.status(400).send({ status: false, message: "OTP not matched." });
        }

        // Check if the OTP has expired
        if (new Date().getTime() > existingUser.pinChangedOtpExpireTime) {
            return res.status(410).send({ status: false, message: "OTP has expired." });
        }

        let user = await updateUser({ _id: existingUser._id }, { pinChangedOtpVerification: true });
        const token = await commonFunction.generateJWT({ email: email, id: user._id });
        user.pin = undefined;
        return res.status(200).send({ status: true, message: "User Login successfully.", user, token });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



/**
* @swagger
* /auth/reset-pin-password:
*   post:
*     summary: reset-pin-password
*     tags:
*       - User Authentication With Pin
*     description: reset-pin-password
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/change_pin_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*       '410':
*         description: Gone
*/
exports.resetPinPassword = async (req, res, next) => {
    try {
        const { new_pin, confirm_pin } = req.body;

        if (new_pin != confirm_pin) {
            return res.status(400).send({ status: false, message: "Confirm pin not matched." });
        }

        const pin = await bcrypt.hash(new_pin, 10);
        await updateUser({ _id: req.user._id }, { pin });
        return res.status(200).send({ status: true, message: "Pin Changed Successfully." });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


/**
* @swagger
* /auth/delete-data:
*   get:
*     summary: Delete Data
*     tags:
*       - Child
*     description: Delete Data
*     produces:
*       - application/json'
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication
*         required: true
*         type: string
*     responses:
*       '200':  
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.deleteData = async (req, res, next) => {
    try {
        let collections = ["questions", "completed_questions", "completed_modules", "completed_levels", "modules", "levels", 'lessons', 'users', 'children']
        collections.map(async (collectionName) => {
            console.log("collectionName: ", collectionName);
            await mongoose.connection.db.dropCollection(collectionName);
            console.log(`Collection ${collectionName} dropped successfully.`);
            return { collectionName, dropped: true };
        });
        return res.status(200).send({ status: true, message: "Data Drop Successfully." });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    } 
}