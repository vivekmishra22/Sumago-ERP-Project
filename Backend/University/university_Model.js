const mongoose = require('mongoose');
// Const {mongoose,Schema} = require('mongoose');
const data = mongoose.Schema({
    // office_id:{
    //     type:String,
    //     type:Schema.Types.ObjectId,
    //               ref:‘city’,

    //     required:true,
    //     },

    university_name: {
        type: String,
        required: true,
    },
    status: {
        // type:active/inactive,
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('university', data);


