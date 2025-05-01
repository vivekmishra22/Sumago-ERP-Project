const mongoose = require ('mongoose')
    const data = mongoose.Schema({
        university_name:String,
        college_name:{
            type:String,
            required:true,
        
        },
        city_name:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        }
    })
    
    module.exports = mongoose.model('college',data);