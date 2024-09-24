const mongoose = require('mongoose');

// Import service functions
const { levelServices } = require('../../service/levels');
const { findAllLevels } = levelServices;

// Fetch all levels  using aggregation
exports.getAllLevels = async (req, res) => {
    try {
        // Extract query parameters
        const { module_id, standard_id } = req.query;
        let levels = await findAllLevels({ module_id, standard_id });

        // Send a 200 response with the levels list and pagination info
        return res.status(200).send({
            status: true,
            message: "Levels fetched successfully.",
            data: levels,
        });
    } catch (error) {
        // Handle any errors that occur during the modules retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};