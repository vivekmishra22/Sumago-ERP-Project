// const{mongoose,Schema} = require('mongoose')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bde_detail= new Schema({
  fname: 
  { type: String, 
    required: true
   },
  lname: 
  { type: String,
     required: true 
    },
  email: 
  {
     type: String,
     required: true,
     unique: true 
    },
 
  password: 
  { type: String,
     required: true 
    },
  status: 
  { 
    type: String, 
    // default: 'Active' 
  },
});

module.exports = mongoose.model('BDE', bde_detail);

// const user_detail = mongoose.Schema({
  
//     fname:
//     {
//         type: String,
//        required: true,
//     },

//     lname:
//     {
//         type:String,
//         required:true,
//     },
    
//     email:
//     {
//     type:String, 
//     required:true,
//     },
//     password:
//     {
//         type:String,
//         required:true,
//     },
//     status:
//     {
//         type:String
//     }
//     // expenses:[
//     //     {
//     //       type:Schema.Types.ObjectId,
//     //       ref:'expense',
//     //       required:true,
//     //     }]
//      })

    
    
// module.exports = mongoose.model('user',user_detail);

