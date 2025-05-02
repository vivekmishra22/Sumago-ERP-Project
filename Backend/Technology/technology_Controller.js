const model = require('../Technology/technology_Model')

// post API
const add = async(req, res) => {
    const {  name, status} = req.body;
    try {
        const existingName = await model.findOne({ name });
        if (existingName) {
          return res.status(400).json({ message: 'Technology name already exists' });
        }
        const data = new model({
             name, status
        });
        const userdata = await data.save()
        res.send({userdata});
    }
    catch (error){
        if (error.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
            return res.status(400).json({ message: 'Technology already exists' });
        }

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
const getbyIdtechnology = async (req, res) => {
    try{
        const data = await model.findOne({_id: req.params})
        res.status(200).send({data});
    }catch (error) {
        console.log(error);
    }
}

// Delete API
const deleteTechnology = async (req, res) => {
    try{
        const userdata = await model.deleteOne({_id: req.params._id})
        res.status(200).send({userdata});
    }catch (error) {
        // console.log(err);
        res.status(500).send(err);
    }
}


//Update API
const UpdateTechnology = async (req, res) => {
    const { name, status} = req.body;
    try{

        const existingName = await model.findOne({ name, status });
        if (existingName) {
          return res.status(400).json({ message: 'Technology name already exists' });
        }

        const data = await model.updateOne(
            {_id: req.params._id},
            { $set: {
                 name, status
            },}
            
        );
        if (data) {
            res.status(200).send({message: "user update found"});
        }else{
            res.status(300).send({message: "user update not found"});
        }

    } catch (error){
        if (error.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
            return res.status(400).json({ message: 'Technology already exists' });
        }

        console.log(error);
        return res.status(500).json({ message:'internal servar error'})
    }
};


module.exports = {add, getdata, getbyIdtechnology, deleteTechnology, UpdateTechnology}

