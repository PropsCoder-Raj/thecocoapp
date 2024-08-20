const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import service functions for user, child, levels, lessons, questions, standards, completed modules, completed levels, completed questions, current questions, and schools.
const { userServices } = require("../service/users");
const { createUser, findUser, updateUser } = userServices;

const { childServices } = require('../service/child');
const { findAllChildren, insertChild, findChildCount, findChild } = childServices;

const { levelServices } = require('../service/levels');
const { findAllLevels } = levelServices;

const { lessonServices } = require('../service/lessons');
const { findAllLessons } = lessonServices;

const { questionServices } = require('../service/questions');
const { findAllQuestions } = questionServices;

const { standardServices } = require('../service/standards');
const { aggregateStandards, findStandard, findAllStandards } = standardServices;

const { completedModulesService } = require('../service/completedmodules');
const { findAllCompletedModules } = completedModulesService;

const { completedLevelsService } = require('../service/completedlevels');
const { findAllCompletedLevels } = completedLevelsService;

const { completedQuestionsService } = require('../service/completedquestions');
const { findAllCompletedQuestions } = completedQuestionsService;

const { currentQuestionsService } = require('../service/currentquestions');
const { findAllCurrentQuestions } = currentQuestionsService;

const { schoolServices } = require('../service/schools');
const { findAllSchool, findSchool, updateSchool, createSchool } = schoolServices;

const commonFunction = require("../helper/utils");
const userTypeEnums = require("../enums/userType");

// Handle admin login
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Find an admin user by email
        const existingAdmin = await findUser({ email: email });
        if (!existingAdmin) {
            // If no admin found, send a 400 response with an error message
            return res.status(400).send({ status: false, message: "Admin not registered." });
        }

        // Compare the provided password with the stored hashed password
        const passwordStatus = await bcrypt.compare(password, existingAdmin.password);
        if (!passwordStatus) {
            // If password does not match, send a 400 response with an error message
            return res.status(400).send({ status: false, message: "Password not matched." });
        }

        // Generate JWT token for the admin
        const token = await commonFunction.generateAdminJWT({ email: email, id: existingAdmin._id });
        // Send a 200 response with success message and token
        return res.status(200).send({ status: true, message: "Admin Login successfully.", token });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Fetch various counts for the dashboard
exports.dashboardCount = async (req, res, next) => {
    try {
        // Execute all count retrieval operations concurrently
        const [
            userCount,
            childCount,
            levelCount,
            lessonCount,
            questionCount,
            standardCount,
            schoolCount
        ] = await Promise.all([
            findUser({ userType: userTypeEnums.USER }), // Count users
            findChildCount(), // Count children
            findAllLevels(), // Get all levels
            findAllLessons(), // Get all lessons
            findAllQuestions(), // Get all questions
            findAllStandards(), // Get all standards
            findAllSchool() // Get all schools
        ]);

        // Send a 200 response with the counts
        return res.status(200).send({
            status: true,
            message: "Dashboard count fetched successfully.",
            data: {
                userCount: userCount.length, // Number of users
                childCount: childCount, // Number of children
                levelCount: levelCount.length, // Number of levels
                lessonCount: lessonCount.length, // Number of lessons
                questionCount: questionCount.length, // Number of questions
                standardCount: standardCount.length, // Number of standards
                schoolCount: schoolCount.length // Number of schools
            }
        });
    } catch (error) {
        // Handle any errors that occur during the count retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
}
