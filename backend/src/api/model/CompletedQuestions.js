// Import required packages
const mongoose = require('mongoose');

// Define the questions schema
const questionschema = new mongoose.Schema({
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'questions', required: true },
    level_id: { type: mongoose.Schema.Types.ObjectId, ref: 'levels', required: true },
    module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'modules', required: true },
    child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'children', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'modules', required: true },
    attemptCount: { type: Number, default: 1 }, 
    points: { type: Number, default: 0 }, 
    correstAnswer: { type: Boolean, default: false },
    isDummy: { type: Boolean, default: false } 
}, { timestamps: true });

// Create the questions model
const questions = mongoose.model('completed_questions', questionschema);

// Export questions model
module.exports = questions;