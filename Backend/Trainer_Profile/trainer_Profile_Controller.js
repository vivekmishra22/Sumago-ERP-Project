const model = require('./trainer_Profile_Model');

// post API
const add = async(req, res) => {
    const { 
        // Basic Information
        full_Name, job_title, Phone, email, country, state, city_name, 
        // Professional Summary
        brief_bio, areas_specialization, 
        // Educational Background
        degree_earned, certifications,
        // Work Experience
        year, job_roles, job_duration, key_responsibilities_achievements,
        // Technical Skills// Technical Skills
        programming_languages, software_expertise, hardware_networking_knowledge, training_tools, 
        // Training & Teaching Experience
        courses_taught, training_methods, seminars_conducted, 
        languages_spoken, availability, github, linkedIn, website, status
    } = req.body;
    try {
        const data = new model({
           
           // Basic Information
            full_Name, job_title, Phone, email, country, state, city_name, 
            // Professional Summary
            brief_bio, areas_specialization, 
            // Educational Background
            degree_earned, certifications,
            // Work Experience
            year, job_roles, job_duration, key_responsibilities_achievements,
            // Technical Skills
            programming_languages, software_expertise, hardware_networking_knowledge, training_tools, 
            // Training & Teaching Experience
            courses_taught, training_methods, seminars_conducted, 
            languages_spoken, availability, github, linkedIn, website, status,

            image:req.file.filename
            
        });
        const userdata = await data.save()
        res.send({userdata});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ message:'internal servar error'})
    }
   
}
    


// Get API
const getdata = async(req, res) => {
    try{
        const data = await model.find()
        res.status(200).send({data});
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal server error"})
    }
}

// getById API
const getbyId = async (req, res) => {
    try{
        const data = await model.findOne({_id: req.params._id})
        res.status(200).send({data});
    }catch (error) {
        console.log(error);
    }
}

// Delete API
const Delete = async (req, res) => {
    try{
        const userdata = await model.deleteOne({_id: req.params._id})
        res.status(200).send({userdata});
    }catch (error) {
        // console.log(err);
        res.status(500).send(err);
    }
}


//Update API
const Update = async (req, res) => {
    const {
        // Basic Information
        full_Name, job_title, Phone,  email,  country, state, city_name, 
        // Professional Summary
        brief_bio, areas_specialization, 
        // Educational Background
        degree_earned, certifications,
        // Work Experience
        year, job_roles, job_duration, key_responsibilities_achievements,
        // Technical Skills
        programming_languages, software_expertise, hardware_networking_knowledge, training_tools, 
        // Training & Teaching Experience
        courses_taught, training_methods, seminars_conducted, 
        languages_spoken, availability, github, linkedIn, website, status
    } = req.body;
    try{
        const data = await model.updateOne(
            {_id: req.params._id},
            { $set: {
               
               // Basic Information
                full_Name, job_title, Phone,  email,  country, state, city_name, 
                // Professional Summary
                brief_bio, areas_specialization, 
                // Educational Background
                degree_earned, certifications,
                // Work Experience
                year, job_roles, job_duration, key_responsibilities_achievements,
                // Technical Skills
                programming_languages, software_expertise, hardware_networking_knowledge, training_tools, 
                // Training & Teaching Experience
                courses_taught, training_methods, seminars_conducted, 
                languages_spoken, availability, github, linkedIn, website, status,
                image:req.file.filename
                
            },}
            
        );
        if (data) {
            res.status(200).send({message: "user update found"});
        }else{
            res.status(300).send({message: "user update not found"});
        }

    } catch (error){
        console.log(error);
        return res.status(500).json({ message:'internal servar error'})
    }
};


module.exports = {add, getdata, getbyId, Delete , Update};
