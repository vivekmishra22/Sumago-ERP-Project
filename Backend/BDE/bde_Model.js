const{mongoose} = require('mongoose');

const bde_detail = mongoose.Schema({
  
    fname:
    {
        type: String,
       required: true,
    },

    lname:
    {
        type:String,
        required:true,
    },
    
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
    status:
    {
        type:String
    }
    // expenses:[
    //     {
    //       type:Schema.Types.ObjectId,
    //       ref:'expense',
    //       required:true,
    //     }]
     })

    
    
module.exports = mongoose.model('bde',bde_detail);