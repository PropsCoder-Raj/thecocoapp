// Import the school model
const schoolModel = require('../model/School');

// Define school services
const schoolServices = {
    // Function to create a new school
    createSchool: async (insertObj) => {
        // Create a new school in the database using the school model
        return await schoolModel.create(insertObj);
    },
    // Function to find a school by query
    findSchool: async (query) => {
        // Find a school in the database based on the query, excluding the password field
        return await schoolModel.findOne(query);
    },
    // Function to find multiple school by query
    findAllSchool: async (query) => {
        // Find multiple school in the database based on the query, excluding the password field
        return await schoolModel.find(query);
    },
    // Function to update a task based on query
    updateSchool: async (query, updateObj) => {
        return await schoolModel.findOneAndUpdate(query, updateObj, { new: true, upsert: true});
    },
    
    // Function to aggregate school by pipeline
    aggregateSchool: async (pipeline) => {
        return await schoolModel.aggregate(pipeline);
    }
}

// Export the school services
module.exports = { schoolServices };
