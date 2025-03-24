const mongoose = require('mongoose');
 
const data = mongoose.Schema({

    duration:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        requrid:true
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Duration', data);