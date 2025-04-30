const mongoose = require ('mongoose')
const data = mongoose.Schema({
    
    country:{
        type:String,
        required:true,
        unique:true
    },
    state:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        required:true,
    }
        
        
})

module.exports = mongoose.model('country',data);