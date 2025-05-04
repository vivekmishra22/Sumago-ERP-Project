const{mongoose,Schema} = require('mongoose')

const admin_detail = mongoose.Schema({
  
    
    email:
    {
    type:String, 
    required:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    users:[
        {
          type:Schema.Types.ObjectId,
          ref:'user'
        }]
    })

module.exports = mongoose.model('admin',admin_detail);