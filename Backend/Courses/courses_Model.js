const mongoose = require('mongoose');
const  data = mongoose.Schema({

name:{
type:String,
required:true,
},
course_description:{
type:String,
required:true,
},
duration:{
type:String,
required:true,
},
amount:{
type:String,
required:true,
},
status:{
    type:String,
    required:true,
}

})

module.exports = mongoose.model('course',data);