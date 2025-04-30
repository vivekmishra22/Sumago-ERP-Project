const mongoose = require('mongoose');

// Create schema for storing educational document uploads
const documentSchema = new mongoose.Schema({
    //   userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Link to User model
    //     required: true,
    //   },
    studentName: {
        type: String,
        required: true 
    },
    aadharCard: {
        type: String,
        required: true,
    },
    panCard: {
        type: String,
        required: true,
    },
    tenthMarksheet: {
        type: String,
        required: true,
    },
    twelfthMarksheet: {
        type: String,
        required: true,
    },
    graduationMarksheet: {
        type: String,
        required: true,
    },
    postGraduationMarksheet: {
        type: String,
        required: false,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
