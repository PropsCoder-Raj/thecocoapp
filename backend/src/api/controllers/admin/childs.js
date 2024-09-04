const { default: mongoose } = require('mongoose');
const { childServices } = require('../../service/child');
const { findAllChildren, insertChild, aggregateChild, updateManyChild, findChild, updateChild } = childServices;

const { schoolServices } = require('../../service/schools');
const { findSchool, findAllSchool } = schoolServices;

const { userServices } = require("../../service/users")
const { createUser, findUser, updateUser } = userServices;


const { completedModulesService } = require('../../service/completedmodules');
const { updateManyCompletedModules } = completedModulesService;

const { completedLevelsService } = require('../../service/completedlevels');
const { updateManyCompletedLevels } = completedLevelsService;

const { completedQuestionsService } = require('../../service/completedquestions');
const { updateManyCompletedQuestions, findAllCompletedQuestions } = completedQuestionsService;

/**
* @swagger
* /admin/child/get-all-childs/{type}:
*   get:
*     summary: Get All child Records
*     tags:
*       - Child
*     description: Get All child Records
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
exports.getAllChild = async (req, res, next) => {
    try {
        // Extract query parameters
        const { type } = req.params;
        const { page = 1, limit = 10, search = "", fromdate = null, todate = null } = req.query;

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Set default values for pagination
        const skip = (pageNumber - 1) * limitNumber;

        // Build the query based on type
        let query = {};
        query.schoolId = type === "WITH_SCHOOL" ? { $ne: null } : { $eq: null };

        // Build the match stage based on search and date range
        if (search) {
            query.$or = [
                { childName: { $regex: search, $options: "i" } },
                { parentEmail: { $regex: search, $options: "i" } },
                { address: { $regex: search, $options: "i" } }
            ];
        }
        if (fromdate && todate) {
            query.createdAt = {
                $gte: new Date(fromdate),
                $lte: new Date(todate)
            };
        }

        // Aggregate children with pagination
        const children = await aggregateChild([
            { $match: query },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "schools",
                    localField: "schoolId",
                    foreignField: "_id",
                    as: "school"
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
            message: "Get Child Data Successfully.",
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
