const { default: mongoose } = require('mongoose');

const { userServices } = require("../service/users")
const { createUser, findUser, updateUser } = userServices;

const { childServices } = require("../service/child")
const { findChild } = childServices;

const { schoolServices } = require("../service/schools")
const { findSchool } = schoolServices;

const commonFunctions = require('../helper/utils')

/**
* @swagger
* /user/get-profile:
*   get:
*     summary: Get User Profile
*     tags:
*       - User
*     description: Get User Profile
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
exports.getProfile = async (req, res, next) => {
    try {
        let schoolName = "", schoolLogo = "";
        const user = await findUser({ _id: req.userId }, { _id: 1, email: 1, name: 1, userType: 1, profilePic: 1, currentChildActive: 1 });
        if(user.currentChildActive){
            const child = await findChild({ _id: req.user.currentChildActive });
            const school = await findSchool({ _id: child.schoolId });
            if(school){
                schoolName = school.schoolName;
                schoolLogo = school.logo;
            }
        }
        return res.status(200).send({ status: true, message: "Get User Profile Data Successfully.", data: { ...user._doc, schoolName, schoolLogo} });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


/**
* @swagger
* /user/update-profile:
*   put:
*     summary: Update user profile data
*     tags:
*       - User
*     description: Update user profile data
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/update_user_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.updateProfile = async (req, res, next) => {
    try {
        const userResult = await updateUser({ _id: req.userId  }, { $set: req.body }, { _id: 1, email: 1, name: 1, userType: 1, profilePic: 1 })
        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "User updated successfully.",
            result: userResult
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}


/**
* @swagger
* /user/upload-photo:
*   post:
*     summary: Upload photo
*     tags:
*       - User
*     description: Upload photo
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/upload_photo_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.uploadPhoto = async (req, res, next) => {
    try {

        const uploadPhoto = await commonFunctions.uploadImageCloudinary(req.body.photo)

        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "User updated successfully.",
            result: uploadPhoto
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}

/**
* @swagger
* /user/upload-photo-multer:
*   post:
*     summary: Upload photo-multer
*     tags:
*       - User
*     description: Upload photo-multer
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*         schema:
*           type: string
*       - in: formData
*         name: image
*         description: The image to upload
*         required: true
*         schema:
*           type: file
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.uploadPhotoMulter = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const uploadPhoto = await commonFunctions.uploadImageCloudinary(req.file.path)

        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "User updated successfully.",
            result: uploadPhoto,
            buffer: req.file.buffer,
            file: req.file
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}