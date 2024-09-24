const mongoose = require('mongoose');

// Import service functions
const { lessonServices } = require('../../service/lessons');
const { findAllLessons } = lessonServices;

// Fetch all lessons using aggregation
exports.getAllLessons = async (req, res) => {
    try {
        // Extract query parameters
        const { level_id, module_id, standard_id } = req.query;
        let lessons = await findAllLessons({ level_id, module_id, standard_id });

        // Send a 200 response with the lessons list and pagination info
        return res.status(200).send({
            status: true,
            message: "Lessons fetched successfully.",
            data: lessons,
        });
    } catch (error) {
        // Handle any errors that occur during the modules retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};