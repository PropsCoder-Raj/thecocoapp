const mongoose = require('mongoose');

// Import service functions
const { questionServices } = require('../../service/questions');
const { findAllQuestions } = questionServices;

// Fetch all questions  using aggregation
exports.getAllQuestions = async (req, res) => {
    try {
        // Extract query parameters
        const { level_id, module_id, standard_id } = req.query;
        let questions = await findAllQuestions({ level_id, module_id, standard_id });

        // Send a 200 response with the questions list and pagination info
        return res.status(200).send({
            status: true,
            message: "Questions fetched successfully.",
            data: questions,
        });
    } catch (error) {
        // Handle any errors that occur during the modules retrieval process
        return res.status(500).send({ status: false, message: error.message });
    }
};