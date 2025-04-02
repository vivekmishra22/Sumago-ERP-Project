const mongoose = require ('mongoose');

const data = mongoose.Schema({

    student_name: { type: String, required: true},
    university_name:{type:String, required:true },
    college_name:{ type:String, required:true },
    city_name:{ type:String, required:true },
    mobile_number:{ type:Number, required:true },
    whatsApp_number:{ type:Number, required:true },
    date_birth:{ type:Date, required:true},
    gmail:{ type:String, required:true },
    blood_Group:{ type:String, required:true },
    education_name: { type: String, required: true},
    marital_status:{ type:String, required:true },
    office_city_name:{ type: String, required: true },  
    temporary_address:{ type:String, required:true },
    permanent_address:{ type:String, required:true },
    mode_education:{ type:String, required:true},
    course_name:{ type:String, required:true },
    duration:{ type:String, required:true },
    amount:{ type:String, required:true },
    placement_reference:{ type:String, required:true },
    system:{ type:String, required:true },
    tshirt:{ type:String, required:true },
    batch_slot:{ type:String, required:true },
    status: { type: String, required: true }
})

module.exports = mongoose.model("Enquiry Student", data);