const mongoose = require('mongoose');

// Import service functions
const { moduleServices } = require('../../service/modules');
const { aggregateModules, updateModule } = moduleServices;

// Fetch all modules with child count using aggregation
exports.modulesList = async (req, res) => {
    try {
        // Extract query parameters
        const { standard_id } = req.query;

        // Aggregate modules with child count, module count, and apply pagination
        let modules = await aggregateModules([
            { $sort: { module_id: 1 } },
            {
                // Lookup to count the levels related to the standard
                $lookup: {
                    from: "levels", // collection name for levels
                    localField: "_id", // field in the modules collection
                    foreignField: "module_id", // field in the levels collection
                    as: "levels" // result alias
                }
            },
            {
                // Add a field to store the count of levels
                $addFields: {
                    levelsCount: { $size: "$levels" }
                }
            },
            {
                $project: {
                    levels: 0
                }
            }
        ]);

        modules = modules.filter((element) => element.standard_id.toString() === standard_id.toString());

        // Send a 200 response with the modules list and pagination info
        return res.status(200).send({
            status: true,
            message: "Modules fetched successfully.",
            data: modules,
        });
    } catch (error) {
        // Handle any errors that occur during the modules retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};

exports.updateModule = async (req, res) => {
    try {
        // Extract query parameters
        const { module_id } = req.params;
        console.log("module_id: ", module_id);
        
        const updateResult = await updateModule({ _id: module_id }, { $set: req.body });

        // Send a 200 response with upadte the module
        return res.status(200).send({
            status: true,
            message: "Module updated successfully.",
            data: updateResult,
        });
    } catch (error) {
        // Handle any errors that occur during the modules retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
}