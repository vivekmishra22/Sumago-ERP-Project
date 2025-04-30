const mongoose = require('mongoose')
const  data = mongoose.Schema({

    // Basic Information

full_Name:{ type:String, required:true},
image :{ type:String, required:true},
job_title:{ type:String, required:true },
Phone :{ type:Number, required:true },
email:{ type:String, required:true},
country:{ type:String, required:true },
state:{ type:String,required:true},
city_name:{ type:String, required:true},

// Professional Summary
brief_bio:{ type:String, required:true },
areas_specialization :{ type:String, required:true },

// Educational Background
degree_earned:{ type:String, required:true},
certifications :{ type:String, required:true},

// Work Experience
year :{type:Number, required:true},
job_roles:{type:String,required:true},
job_duration:{type:String,required:true},
key_responsibilities_achievements :{type:String,required:true},

// Technical Skills
programming_languages:{type:String,required:true},
software_expertise :{type:String,required:true},
hardware_networking_knowledge :{type:String,required:true},
training_tools :{type:String,required:true},

// Training & Teaching Experience
courses_taught:{ type:String,required:true},
training_methods:{type:String,required:true},
seminars_conducted:{type:String,required:true},
languages_spoken:{type:String,required:true},
availability:{type:String,required:true},
github:{type:String,required:true},
linkedIn:{type:String,required:true},
website:{type:String,required:true},

status:{type:String,required:true}

})

module.exports = mongoose.model('trainer_profile',data);