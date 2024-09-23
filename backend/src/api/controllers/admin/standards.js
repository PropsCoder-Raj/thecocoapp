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

        // Aggregate standards with child count, module count, and apply pagination
        const standards = await aggregateStandards([
            { $match: matchStage },
            { $sort: { standard_id: 1 } },
            {
                // Lookup to count the modules related to the standard
                $lookup: {
                    from: "modules", // collection name for modules
                    localField: "_id", // field in the standards collection
                    foreignField: "standard_id", // field in the modules collection
                    as: "modules" // result alias
                }
            },
            {
                // Add a field to store the count of modules
                $addFields: {
                    moduleCount: { $size: "$modules" }
                }
            },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limitNumber },
                        { $project: { name: 1, moduleCount: 1, createdAt: 1 } } // Select necessary fields
                    ],
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