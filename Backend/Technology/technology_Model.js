const mongoose = require ('mongoose')
const data = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        unique:true

    },
    status:String
})

module.exports = mongoose.model('technology',data);