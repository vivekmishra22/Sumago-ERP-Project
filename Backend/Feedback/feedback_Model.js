const mongoose = require('mongoose');
const data = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true,
    },
    trainer_name: {
        type: String,
        required: true,
    },
    current_date: {
        type: Date,
        default: Date.now // Automatically stores the current date
    },
    training_rating: {
        type: String,
        enum: ['Excellent', 'Good', 'Average', 'Poor'], 
        required: true
    },
    trainer_explanation: {
        type: String,
        enum: ['Very Clearly', 'Clearly', 'Somewhat Clearly', 'Not Clearly'],
        required: true
    },
    materials_helpful: {
        type: String,
        enum: ['Yes', 'No', 'Somewhat'],
        required: true
    },
    practical_exercises: {
        type: String,
        enum: ['Yes', 'No', 'Somewhat'],
        required: true
    },
    confidence_using_skills: {
        type: String,
        enum: ['Yes', 'No', 'Somewhat'],
        required: true
    },
    learning_expectations_met: {
        type: String,
        enum: ['Yes', 'No', 'Partially'],
        required: true
    },
    liked_most: {
        type: String,
        default: ''
    },
    improvements: {
        type: String,
        default: ''
    },
    other_comments: {
        type: String,
        default: ''
    }

})

module.exports = mongoose.model('feedback', data);

