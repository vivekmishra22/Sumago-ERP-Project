const mongoose = require('mongoose');

const data = mongoose.Schema({

    student_name: { type: String, required: true},
    name:{ type:String, required:true },
    current_date:{ type:Date, default: Date.now },
    welcome_kit:{ type:String, required:true },
    kit_aside:{type:String, required:true},
    status:{ type:String, required:true }
})

module.exports = mongoose.model('Kit Fees Paid', data);