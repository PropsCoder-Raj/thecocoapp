// Import the current questions model
const CurrentQuestions = require('../model/CurrentQuestions');

// Define current questions services
const currentQuestionsService = {
    // Function to create a current question record
    createCurrentQuestions: async (insertObj) => {
        return await CurrentQuestions.create(insertObj);
    },

    // Function to find a current question by query
    findCurrentQuestions: async (query) => {
        return await CurrentQuestions.findOne(query);
    },

    // Function to find multiple current questions by query
    findAllCurrentQuestions: async (query) => {
        return await CurrentQuestions.find(query);
    },

    // Function to update a current question based on query
    updateCurrentQuestions: async (query, updateObj) => {
        return await CurrentQuestions.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    },

    // Function to update multiple current questions based on query
    updateManyCurrentQuestions: async (query, updateObj) => {
        return await CurrentQuestions.updateMany(query, updateObj, { new: true });
    },

    // Function to delete a current question based on query
    deleteCurrentQuestions: async (query) => {
        return await CurrentQuestions.deleteOne(query);
    },

    // Function to delete many a current question based on query
    deleteManyCurrentQuestions: async (query) => {
        return await CurrentQuestions.deleteMany(query);
    },
};

// Export the current questions services
module.exports = { currentQuestionsService };
