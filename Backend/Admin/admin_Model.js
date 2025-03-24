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
    // users:[
    //     {
    //       type:Schema.Types.ObjectId,
    //       ref:'user'
    //     }]
    })

//     UserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//     email: { type: String, required: true, unique: true },
//     role: { type: String, required: true, enum: ['admin', 'user'] },

//      })

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const adminSchema = new Schema({
//     email: { type: String, required: true, unique: true },
//     password:
// {
//    type:String,
// required:true,
// },
//     role: { type: String, required: true, enum: ['admin', 'user'] },
//     users: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Array to store multiple users
// }, { timestamps: true });

// module.exports = mongoose.model('admin', adminSchema);

    
module.exports = mongoose.model('admin',admin_detail);