// Import the child model
const childModel = require('../model/Child');

// Define child services
const childServices = {
    // Function to create a new child
    createChild: async (insertObj) => {
        // Create a new child in the database using the child model
        return await childModel.create(insertObj);
    },
    // Function to create a new child
    insertChild: async (insertObj) => {
        // Create a new child in the database using the child model
        return await childModel.insertMany(insertObj);
    },
    // Function to find a child by query
    findChild: async (query) => {
        // Find a child in the database based on the query
        return await childModel.findOne(query);
    },
    // Function to find a child by query
    findChildCount: async (query) => {
        // Find a child in the database based on the query
        return await childModel.countDocuments(query);
    },
    // Function to find multiple children by query
    findAllChildrenWithPopulate: async (query, projection = {}) => {
        // Find multiple children in the database based on the query
        return await childModel.find(query, projection).populate("schoolId");
    },
    // Function to find multiple children by query
    findAllChildren: async (query) => {
        // Find multiple children in the database based on the query
        return await childModel.find(query);
    },
    // Function to update a child based on query
    updateChild: async (query, updateObj) => {
        return await childModel.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    },
    // Function to update a child based on query
    updateManyChild: async (query, updateObj) => {
        return await childModel.updateMany(query, updateObj, { new: true, upsert: true });
    },
    // Function to aggregate a child based with pipeline
    aggregateChild: async (pipeline) => {
        return await childModel.aggregate(pipeline);
    },
}

// Export the child services
module.exports = { childServices };
