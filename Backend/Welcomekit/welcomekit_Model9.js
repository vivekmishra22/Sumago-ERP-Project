 const mongoose = require ('mongoose')
    const data = mongoose.Schema({
       
        welcome_kit:{
            type:String,
            required:true,
            unique:true
            
        },
        status:{
            
            type:String,
            required:true,
           
        }
    })
    
    module.exports = mongoose.model('welcomekit',data);