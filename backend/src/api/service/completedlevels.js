const CompletedLevels = require('../model/CompletedLevels');

const completedLevelsService = {
    // Function to create a completed level record
    createCompletedLevel: async (insertObj) => {
        return await CompletedLevels.create(insertObj);
    },

    // Function to find a completed level by query
    findCompletedLevel: async (query) => {
        return await CompletedLevels.findOne(query);
    },

    // Function to find multiple completed levels by query
    findAllCompletedLevels: async (query) => {
        return await CompletedLevels.find(query);
    },

    // Function to update a completed level based on query
    updateCompletedLevel: async (query, updateObj) => {
        return await CompletedLevels.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    },

    // Function to update multiple completed levels based on query
    updateManyCompletedLevels: async (query, updateObj) => {
        return await CompletedLevels.updateMany(query, updateObj, { new: true });
    },

    // Function to delete a completed level based on query
    deleteCompletedLevel: async (query) => {
        return await CompletedLevels.deleteOne(query);
    },
};

module.exports = { completedLevelsService };
