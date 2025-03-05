const model = require('./fee_Model')

// post API
const add = async(req, res) => {
    const { fee_date, course_name, course_duration, amount, status } = req.body;
    try {
        const data = new model({
            fee_date, course_name, course_duration, amount, status
        });
        const userdata = await data.save()
        res.send({userdata});
    }
    catch (error){
        console.log(error);
        return res.status(500).json({ message:'Internal Servar Error'})
    }
}

// Get API
const getdata = async(req, res) => {
    try{
        const data = await model.find()
        res.status(200).send({data});
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

// getById API
const getbyId = async (req, res) => {
    // const { _id } = req.params;
    try{
        const data = await model.findOne({_id: req.params})
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
    const { fee_date, course_name, course_duration, amount, status } = req.body;
    try{
        const data = await model.updateOne(
            {_id: req.params._id},
            { $set: {
                fee_date, course_name, course_duration, amount, status
            },}
            
        );
        if (data) {
            res.status(200).send({message: "Updated Successfully"});
        }
    

    }catch (error) {
        console.log(error);
        res.status(500).send({message: " Internal Server Error"})
    }
};


module.exports = { add, getdata, getbyId, Delete , Update }

