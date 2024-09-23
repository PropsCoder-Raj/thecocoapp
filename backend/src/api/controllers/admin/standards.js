const mongoose = require('mongoose');

// Import service functions
const { standardServices } = require('../../service/standards');
const { aggregateStandards } = standardServices;

// Fetch all standards with child count using aggregation
exports.standardsList = async (req, res) => {
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
                { name: { $regex: search, $options: "i" } }
            ];
        }
        if (fromdate && todate) {
            matchStage.createdAt = {
                $gte: new Date(fromdate),
                $lte: new Date(todate)
            };
        }

        // Aggregate standards with child count and apply pagination
        const standards = await aggregateStandards([
            { $match: matchStage },
            { $sort: { standard_id: 1 } },
            {
                $facet: {
                    data: [{ $skip: skip }, { $limit: limitNumber }],
                    totalCount: [{ $count: "total" }]
                }
            }
        ]);

        // Calculate total pages
        const totalCount = standards[0].totalCount.length > 0 ? standards[0].totalCount[0].total : 0;
        const totalPages = Math.ceil(totalCount / limitNumber);

        // Send a 200 response with the standards list and pagination info
        return res.status(200).send({
            status: true,
            message: "Standards fetched successfully.",
            data: standards[0].data,
            totalPages: totalPages,
            limit: limitNumber,
            page: pageNumber
        });
    } catch (error) {
        // Handle any errors that occur during the standards retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};