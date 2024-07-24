const CompletedModules = require('../model/CompletedModules');

const completedModulesService = {
    // Function to create a completed module record
    createCompletedModule: async (insertObj) => {
        return await CompletedModules.create(insertObj);
    },

    // Function to find a completed module by query
    findCompletedModule: async (query) => {
        return await CompletedModules.findOne(query);
    },

    // Function to find multiple completed modules by query
    findAllCompletedModules: async (query) => {
        return await CompletedModules.find(query);
    },

    // Function to update a completed module based on query
    updateCompletedModule: async (query, updateObj) => {
        return await CompletedModules.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    },

    // Function to update multiple completed modules based on query
    updateManyCompletedModules: async (query, updateObj) => {
        return await CompletedModules.updateMany(query, updateObj, { new: true });
    },

    // Function to delete a completed module based on query
    deleteCompletedModule: async (query) => {
        return await CompletedModules.deleteOne(query);
    },
};

module.exports = { completedModulesService };
