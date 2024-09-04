const mongoose = require('mongoose');

// Import service functions
const { schoolServices } = require('../../service/schools');
const { aggregateSchool, findSchool, updateSchool, createSchool  } = schoolServices;

const { childServices } = require('../../service/child');
const { aggregateChild } = childServices;

// Fetch all schools with child count using aggregation
exports.schoolsList = async (req, res) => {
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
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
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
                    schoolId: 1,
                    PrincipalName: 1,
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
exports.getSchoolDetails = async (req, res) => {
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

// Fetch all children for a specific school and include parent user details using aggregation
exports.schoolChildrenList = async (req, res) => {
    try {
        const { schoolId } = req.query; // Extract schoolId from query parameters
        const { page = 1, limit = 10, search = "", fromdate = null, todate = null } = req.query; // Extract additional query parameters

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Set default values for pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Build the match stage based on search and date range
        const matchStage = { schoolId: new mongoose.Types.ObjectId(schoolId) };

        if (search) {
            matchStage.$or = [{ childName: { $regex: search, $options: "i" } }];
        }

        if (fromdate && todate) {
            matchStage.dob = { $gte: new Date(fromdate), $lte: new Date(todate) };
        }

        // Aggregate children with parent user details and apply pagination
        const children = await aggregateChild([
            { $match: matchStage },
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
                    data: [{ $skip: skip }, { $limit: limitNumber }],
                    totalCount: [{ $count: "total" }]
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


/**
* @swagger
* /admin/create-school:
*   post:
*     summary: Create user school data
*     tags:
*       - Schools
*     description: Create user school data
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
*             $ref: '#/definitions/change_school_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.createSchoolDetails = async (req, res, next) => {
    try {
        const schoolResult = await createSchool(req.body)
        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "School created successfully.",
            result: schoolResult
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}


/**
* @swagger
* /admin/update-school:
*   put:
*     summary: Update user school data
*     tags:
*       - Schools
*     description: Update user school data
*     produces:
*       - application/json
*     parameters:
*       - in: header
*         name: token
*         description: JWT token obtained after user authentication.
*         required: true
*         schema:
*           type: string
*       - in: query
*         name: schoolId
*         description: School Doc Id 
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/definitions/change_school_def'
*     responses:
*       '200':
*         description: OK
*       '400':
*         description: Bad Request
*       '409':
*         description: Conflict
*/
exports.updateSchoolDetails = async (req, res, next) => {
    try {

        const isSchool = await findSchool({ _id: req.query.schoolId });
        if(!isSchool){
            return res.status(404).send({
                status: false,
                message: "School not found."
            });    
        }

        const schoolResult = await updateSchool({ _id: isSchool._id  }, { $set: req.body })
        // Respond with success message and inserted child records
        return res.status(200).send({
            status: true,
            message: "School updated successfully.",
            result: schoolResult
        });
    } catch (error) {
        // Handle any errors during the process
        return res.status(500).send({ status: false, message: error.message });
    }
}