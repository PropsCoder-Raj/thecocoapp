const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import service functions for user, child, levels, lessons, questions, standards, completed modules, completed levels, completed questions, current questions, and schools.
const { userServices } = require("../../service/users");
const { findUser, aggregateUsers, findAllUser, insertManyUsers } = userServices;

const { childServices } = require('../../service/child');
const { findAllChildren, insertChild, findChildCount, } = childServices;

const { levelServices } = require('../../service/levels');
const { findAllLevels } = levelServices;

const { lessonServices } = require('../../service/lessons');
const { findAllLessons } = lessonServices;

const { questionServices } = require('../../service/questions');
const { findAllQuestions } = questionServices;

const { standardServices } = require('../../service/standards');
const { findAllStandards } = standardServices;

const { schoolServices } = require('../../service/schools');
const { findAllSchool, findSchool } = schoolServices;

const commonFunction = require("../../helper/utils");
const userTypeEnums = require("../../enums/userType");
const { convertExcelToJson } = require('../../helper/excelService');
const userType = require('../../enums/userType');

// Handle admin login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body

        // Find an admin user by email
        const existingAdmin = await findUser({ email });
        if (!existingAdmin) {
            return res.status(400).send({ status: false, message: "Admin not registered." });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
        if (!passwordMatch) {
            return res.status(400).send({ status: false, message: "Password does not match." });
        }

        // Generate JWT token for the admin
        const token = await commonFunction.generateAdminJWT({ email, id: existingAdmin._id });
        return res.status(200).send({ status: true, message: "Admin login successful.", token });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Fetch various counts for the dashboard
exports.dashboardCount = async (req, res) => {
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
            findUser({ userType: userTypeEnums.USER }), // Count users
            findAllChildren(), // Count children
            findAllLevels(), // Get all levels
            findAllLessons(), // Get all lessons
            findAllQuestions(), // Get all questions
            findAllStandards(), // Get all standards
            findAllSchool(), // Get all schools
            findAllChildren({ schoolId: null }) // Count children without school
        ]);

        // Calculate normal users count based on unique user IDs
        const normalUsersCount = [...new Set(normalChildCount.map(child => child.userId))];

        // Send a 200 response with the counts
        return res.status(200).send({
            status: true,
            message: "Dashboard count fetched successfully.",
            data: {
                userCount: userCount.length,
                childCount: childCount.length,
                levelCount: levelCount.length,
                lessonCount: lessonCount.length,
                questionCount: questionCount.length,
                standardCount: standardCount.length,
                schoolCount: schoolCount.length,
                normalUsersCount: normalUsersCount.length,
                withSchoolUsersCount: userCount.length - normalUsersCount.length,
                normalChildCount: normalChildCount.length,
                withSchoolChildCount: childCount - normalChildCount.length
            }
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// Fetch all users with pagination and child count
exports.usersList = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", fromdate = null, todate = null } = req.query;

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
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
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
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
                    data: [{ $skip: skip }, { $limit: limitNumber }],
                    totalCount: [{ $count: "total" }]
                }
            }
        ]);

        // Calculate total pages
        const totalCount = users[0].totalCount.length > 0 ? users[0].totalCount[0].total : 0;
        const totalPages = Math.ceil(totalCount / limitNumber);

        return res.status(200).send({
            status: true,
            message: "Users fetched successfully.",
            data: users[0].data,
            totalPages,
            limit: limitNumber,
            page: pageNumber
        });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// Fetch all children of a user and get school details without pagination
exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.query;

        // Find the user by id
        const user = await findUser({ _id: userId });

        // Find all children of the user
        const children = await findAllChildren({ userId });

        // Fetch school details for each child
        const childrenWithSchool = await Promise.all(children.map(async (child) => {
            const school = await findSchool(child.schoolId);
            return { ...child._doc, school };
        }));

        return res.status(200).send({ status: true, message: "Children fetched successfully.", user, data: childrenWithSchool });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

// Import users and children from an Excel file and return them as arrays
exports.importUsers = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = req.file.path;
        const jsonData = await convertExcelToJson(filePath);

        const schoolList = await findAllSchool();
        const usersList = await findUser({ userType: userTypeEnums.USER });

        // Validate the imported data
        for (let element of jsonData) {
            const school = schoolList.find(school => school.schoolId == element.school_id);
            const user = usersList.find(user => user.email == element.user_email);

            if (!school) {
                return res.status(400).send({ status: false, message: `School not found for ${element.school_id}` });
            }

            if (user) {
                return res.status(400).send({ status: false, message: `User already exists for ${element.user_email}` });
            }
        }

        // Create users and children from imported data
        const users = jsonData.map(element => ({
            name: element.user_name,
            email: element.user_email,
            password: bcrypt.hashSync("123456", 10),
            userType: userTypeEnums.USER
        }));

        const userResults = await insertManyUsers(users);

        const children = jsonData.map(element => ({
            childName: element.child_name,
            schoolId: new mongoose.Types.ObjectId(schoolList.find(school => school.schoolId == element.school_id)._id),
            userId: userResults.find(user => user.email == element.user_email)._id,
            standard: element.child_standard
        }));

        const childsResults = await insertChild(children);

        return res.status(200).send({ status: true, message: "Users imported successfully.", jsonData, usersList, userResults, childsResults });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};