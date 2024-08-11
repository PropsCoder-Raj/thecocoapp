// Import required packages
const mongoose = require('mongoose');

// Define the questions schema
const questionschema = new mongoose.Schema({
    level_id: { type: mongoose.Schema.Types.ObjectId, ref: 'levels', required: true },
    module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'modules', required: true },
    child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'children', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'modules', required: true },    
    
    nextQuestionId: { type: mongoose.Schema.Types.ObjectId, ref: 'questions', required: true },
    nextQuestionNo  : { type: Number, required: true },
    susscessQuestions: { type: Number, required: true },
    loaderPercentage: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    nextScreen: { type: String, required: true },
}, { timestamps: true });

// Create the questions model
const questions = mongoose.model('current_questions', questionschema);

// Export questions model
module.exports = questions;