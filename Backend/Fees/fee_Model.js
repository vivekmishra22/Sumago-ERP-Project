const mongoose = require ('mongoose')
const data = mongoose.Schema({
    
    fee_date:{
        type:Date,
        required:true
    },
    course_name:{
        type:String,
        required:true
    },
    course_duration:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        // type:active/inactive,
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('fee',data);

