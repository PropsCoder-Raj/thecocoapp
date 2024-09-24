// Import the modules model
const modulesModel = require('../model/Modules');

// Define modules services
const moduleServices = {
    // Function to create a new module
    createModule: async (insertObj) => {
        // Create a new module in the database using the modules model
        return await modulesModel.create(insertObj);
    },
    // Function to insert multiple modules
    insertModules: async (insertObj) => {
        // Insert multiple modules in the database using the modules model
        return await modulesModel.insertMany(insertObj);
    },
    // Function to find a module by query
    findModule: async (query) => {
        // Find a module in the database based on the query
        return await modulesModel.findOne(query);
    },
    // Function to count modules by query
    findModuleCount: async (query) => {
        // Count modules in the database based on the query
        return await modulesModel.countDocuments(query);
    },
    // Function to find multiple modules by query
    findAllModules: async (query) => {
        // Find multiple modules in the database based on the query
        return await modulesModel.find(query);
    },
    // Function to update a module based on query
    updateModule: async (query, updateObj) => {
        return await modulesModel.findOneAndUpdate(query, updateObj, { new: true });
    },
    // Function to update multiple modules based on query
    updateManyModules: async (query, updateObj) => {
        return await modulesModel.updateMany(query, updateObj, { new: true, upsert: true });
    },
    aggregateModules: async (pipeline) => {
        return await modulesModel.aggregate(pipeline);
    }
}

// Export the modules services
module.exports = { moduleServices };

