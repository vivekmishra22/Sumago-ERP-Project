const { mongoose } = require('mongoose');
// const { Schema } = mongoose;

const student_detail = mongoose.Schema({

    student_name:
    {
        type: String,
        required: true,
    },

    name:
    {
        type: String,
        required: true,
    },

    duration:
    {
        type: String,
        required: true,
    },
    date:
    {
        type: Date,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    status:
    {
        type: String,
        default: 'Active'
    }

})



module.exports = mongoose.model('student', student_detail);
