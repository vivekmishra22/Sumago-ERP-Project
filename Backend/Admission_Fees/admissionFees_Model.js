const mongoose = require('mongoose');

const data = mongoose.Schema({

    fees_date:{
        type:Date,
        default: Date.now,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model("Admission Fees", data);