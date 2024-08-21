const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import service functions for user, child, levels, lessons, questions, standards, completed modules, completed levels, completed questions, current questions, and schools.
const { userServices } = require("../service/users");
const { createUser, findUser, updateUser } = userServices;

const { childServices } = require('../service/child');
const { findAllChildren, insertChild, findChildCount, findChild, aggregateChild } = childServices;

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
const { findAllSchool, findSchool, updateSchool, createSchool, aggregateSchool } = schoolServices;

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

// Fetch all schools with child count using aggregation
exports.schoolsList = async (req, res, next) => {
    try {
        // Extract query parameters
        const { page = 1, limit = 10, search = "", fromdate = null, todate = null } = req.query;

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Set default values for pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Build the match stage based on search and date range
        const matchStage = {};
        if (search) {
            matchStage.$or = [
                { schoolName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { address: { $regex: search, $options: "i" } }
            ];
        }
        if (fromdate && todate) {
            matchStage.createdAt = {
                $gte: new Date(fromdate),
                $lte: new Date(todate)
            };
        }

        // Aggregate schools with child count and apply pagination
        const schools = await aggregateSchool([
            {
                $match: matchStage
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: "childrens",
                    localField: "_id",
                    foreignField: "schoolId",
                    as: "children"
                }
            },
            {
                $project: {
                    schoolName: 1,
                    email: 1,
                    phone: 1,
                    address: 1,
                    phoneNumber: 1,
                    logo: 1,
                    childrenCount: { $size: "$children" }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limitNumber }
                    ],
                    totalCount: [
                        { $count: "total" }
                    ]
                }
            }
        ]);

        // Calculate total pages
        const totalCount = schools[0].totalCount.length > 0 ? schools[0].totalCount[0].total : 0;
        const totalPages = Math.ceil(totalCount / limitNumber);

        // Send a 200 response with the schools list and pagination info
        return res.status(200).send({
            status: true,
            message: "Schools fetched successfully.",
            data: schools[0].data,
            totalPages: totalPages,
            limit: limitNumber,
            page: pageNumber
        });
    } catch (error) {
        // Handle any errors that occur during the schools retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};

// Get the details of a school by id
exports.getSchoolDetails = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract school id from request parameters

        // Find the school by id
        const school = await findSchool(id);
        if (!school) {
            // If school not found, send a 400 response with an error message
            return res.status(400).send({ status: false, message: "School not found." });
        }

        // Send a 200 response with the school details
        return res.status(200).send({ status: true, message: "School fetched successfully.", data: school });
    } catch (error) {
        // Handle any errors that occur during the school retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};

// Fetch all children where school id is specified and also include parent user details using aggregation
exports.schoolChildrenList = async (req, res, next) => {
    try {
        const { schoolId } = req.query; // Extract schoolId from query parameters
        const { page = 1, limit = 10, search = "", fromdate = null, todate = null } = req.query; // Extract additional query parameters

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Set default values for pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Build the match stage based on search and date range
        const matchStage = {
            schoolId: new mongoose.Types.ObjectId(schoolId)
        };

        if (search) {
            matchStage.$or = [
                { childName: { $regex: search, $options: "i" } }
            ];
        }

        if (fromdate && todate) {
            matchStage.dob = {
                $gte: new Date(fromdate),
                $lte: new Date(todate)
            };
        }

        // Aggregate children with parent user details and apply pagination
        const children = await aggregateChild([
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "parent"
                }
            },
            {
                $project: {
                    childName: 1,
                    gender: 1,
                    dob: 1,
                    totalPoints: 1,
                    parent: {
                        name: { $arrayElemAt: ["$parent.name", 0] },
                        email: { $arrayElemAt: ["$parent.email", 0] },
                        profilePic: { $arrayElemAt: ["$parent.profilePic", 0] }
                    }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limitNumber }
                    ],
                    totalCount: [
                        { $count: "total" }
                    ]
                }
            }
        ]);

        // Calculate total pages
        const totalCount = children[0].totalCount.length > 0 ? children[0].totalCount[0].total : 0;
        const totalPages = Math.ceil(totalCount / limitNumber);

        // Send a 200 response with the children list and pagination info
        return res.status(200).send({
            status: true,
            message: "Children fetched successfully.",
            data: children[0].data,
            totalPages: totalPages,
            limit: limitNumber,
            page: pageNumber
        });
    } catch (error) {
        // Handle any errors that occur during the children retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};