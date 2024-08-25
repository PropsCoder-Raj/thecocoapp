const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import service functions for user, child, levels, lessons, questions, standards, completed modules, completed levels, completed questions, current questions, and schools.
const { userServices } = require("../service/users");
const { createUser, findUser, updateUser, aggregateUsers, findAllUser, insertManyUsers } = userServices;

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
const { convertExcelToJson } = require('../helper/excelService');
const userType = require('../enums/userType');

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
            schoolCount,
            normalChildCount,
        ] = await Promise.all([
            findAllUser({ userType: userTypeEnums.USER }), // Count users
            findChildCount(), // Count children
            findAllLevels(), // Get all levels
            findAllLessons(), // Get all lessons
            findAllQuestions(), // Get all questions
            findAllStandards(), // Get all standards
            findAllSchool(), // Get all schools
            findAllChildren({ schoolId: null }) // Count children without school
        ]);

        const normalUsersCount = [...new Set(normalChildCount.map(child => child.userId))];


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
                schoolCount: schoolCount.length, // Number of schools
                normalUsersCount: normalUsersCount.length,
                withSchoolUsersCount: userCount.length - normalUsersCount.length,
                normalChildCount: normalChildCount.length,
                withSchoolChildCount: childCount - normalChildCount.length
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

// Fetch all users from the database with aggregation & pagination with child count
exports.usersList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = "", fromdate = null, todate = null } = req.query; // Extract query parameters

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Set default values for pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Build the match stage based on search and date range
        const matchStage = {
            userType: userTypeEnums.USER
        };
        if (search) {
            matchStage.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }
        if (fromdate && todate) {
            matchStage.createdAt = {
                $gte: new Date(fromdate),
                $lte: new Date(todate)
            };
        }

        // Aggregate users with child count and apply pagination
        const users = await aggregateUsers([
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
                    foreignField: "userId",
                    as: "children"
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    profilePic: 1,
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
        const totalCount = users[0].totalCount.length > 0 ? users[0].totalCount[0].total : 0;
        const totalPages = Math.ceil(totalCount / limitNumber);

        // Send a 200 response with the users list and pagination info
        return res.status(200).send({
            status: true,
            message: "Users fetched successfully.",
            data: users[0].data,
            totalPages: totalPages,
            limit: limitNumber,
            page: pageNumber
        });
    } catch (error) {
        // Handle any errors that occur during the users retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};

// Fetch all childs of a user realtion with school & get school details using aggregation without pagination
exports.getUserDetails = async (req, res, next) => {
    try {
        const { userId } = req.query; // Extract userId from query parameters

        // Find the user by id
        const user = await findUser({ _id: userId });

        // Find all children of a user
        const children = await findAllChildren({ userId: userId });

        // Fetch school details for each child
        const childrenWithSchool = await Promise.all(children.map(async (child) => {
            const school = await findSchool(child.schoolId);
            return { ...child._doc, school };
        }));

        // Send a 200 response with the children list
        return res.status(200).send({ status: true, message: "Children fetched successfully.", user, data: childrenWithSchool });
    } catch (error) {
        // Handle any errors that occur during the children retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};

// import many user & child after user created there userId data using upload excel file and return them as array
exports.importUsers = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = req.file.path;
        const jsonData = await convertExcelToJson(filePath);

        const schoolList = await findAllSchool();
        const usersList = await findAllUser({ userType: userType.USER });

        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index];
            
            const school = schoolList.find(school => school.schoolId == element.school_id);
            const user = usersList.find(user => user.email == element.user_email);

            if (!school) {
                return res.status(400).send({ status: false, message: `School not found for ${element.school_id}` });
            }

            if (user) {
                return res.status(400).send({ status: false, message: `User already found for ${element.user_email}` });
            }
        }

        const users = jsonData.map((element) => {
            return {
                name: element.user_name,
                email: element.user_email,
                password: bcrypt.hashSync("123456", 10),
                userType: userTypeEnums.USER
            }
        });

        const userResults = await insertManyUsers(users)

        const children = jsonData.map((element) => {
            return {
                childName: element.child_name,
                schoolId: new mongoose.Types.ObjectId(schoolList.find(school => school.schoolId == element.school_id)._id),
                userId: userResults.find(user => user.email == element.user_email)._id,
                standard: element.child_standard
            }
        });

        const childsResults = await insertChild(children)

        // Send a 200 response with the created users
        return res.status(200).send({ status: true, message: "Users imported successfully.", jsonData, usersList, userResults, childsResults });
    } catch (error) {
        // Handle any errors that occur during the users import process
        return res.status(500).send({ status: false, message: error.message });
    }
};