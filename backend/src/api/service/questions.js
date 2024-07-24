// Import the question model
const questionModel = require('../model/Questions');

// Define question services
const questionServices = {
    // Function to create a new question
    createQuestion: async (insertObj) => {
        // Create a new question in the database using the question model
        return await questionModel.create(insertObj);
    },
    // Function to insert multiple questions
    insertQuestions: async (insertObj) => {
        // Insert multiple questions in the database using the question model
        return await questionModel.insertMany(insertObj);
    },
    // Function to find a question by query
    findQuestion: async (query) => {
        // Find a question in the database based on the query
        return await questionModel.findOne(query).populate("standard_id");
    },
    // Function to count questions by query
    findQuestionCount: async (query) => {
        // Count questions in the database based on the query
        return await questionModel.countDocuments(query);
    },
    // Function to find multiple questions by query
    findAllQuestions: async (query) => {
        // Find multiple questions in the database based on the query
        return await questionModel.find(query);
    },
    // Function to update a question based on query
    updateQuestion: async (query, updateObj) => {
        return await questionModel.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    },
    // Function to update multiple questions based on query
    updateManyQuestions: async (query, updateObj) => {
        return await questionModel.updateMany(query, updateObj, { new: true, upsert: true });
    },
}

// Export the question services
module.exports = { questionServices };
