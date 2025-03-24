const mongoose = require('mongoose');

const data = mongoose.Schema({

    student_name: { type: String, required: true},
    course_name:{ type:String, required:true },
    date:{ type:Date, required:true},
    welcome_kit:{ type:[String], required:true },
    status:{ type:String, required:true }
})

module.exports = mongoose.model('Kit Fees Paid', data);