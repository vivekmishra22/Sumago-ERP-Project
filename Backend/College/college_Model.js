    const mongoose = require ('mongoose')
    const data = mongoose.Schema({
        
        // university_name:{
        //     type:String,
        //     required:true,
        // },
        // universityId: { type: mongoose.Schema.Types.ObjectId, ref: "university" },
        university_name:String,
        college_name:{
            type:String,
            required:true,
        },
        // city_name:{
        //     type:String,
        //     required:true,
        // },

        // cityId: { type: mongoose.Schema.Types.ObjectId, ref: "city" },
        city_name:String,
            
        status:{
            // type:active/inactive,
            type:String,
            required:true,
        }
    })
    
    module.exports = mongoose.model('college',data);
    
    