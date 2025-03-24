const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type: Date,
        default: Date.now, // Automatically set to the current date
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completionDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Completed", "Incomplete", "Pending", "Not Completed"], // Allowed values
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema);