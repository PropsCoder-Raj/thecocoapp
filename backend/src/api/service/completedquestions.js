// Import the completed questions model
const CompletedQuestions = require('../model/CompletedQuestions');

// Define completed questions services
const completedQuestionsService = {
    // Function to create a completed question record
    createCompletedQuestion: async (insertObj) => {
        return await CompletedQuestions.create(insertObj);
    },

    // Function to find a completed question by query
    findCompletedQuestion: async (query) => {
        return await CompletedQuestions.findOne(query);
    },

    // Function to find multiple completed questions by query
    findAllCompletedQuestions: async (query) => {
        return await CompletedQuestions.find(query);
    },

    // Function to update a completed question based on query
    updateCompletedQuestion: async (query, updateObj) => {
        return await CompletedQuestions.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    },

    // Function to update multiple completed questions based on query
    updateManyCompletedQuestions: async (query, updateObj) => {
        return await CompletedQuestions.updateMany(query, updateObj, { new: true });
    },

    // Function to delete a completed question based on query
    deleteCompletedQuestion: async (query) => {
        return await CompletedQuestions.deleteOne(query);
    },
};

// Export the completed questions services
module.exports = { completedQuestionsService };
