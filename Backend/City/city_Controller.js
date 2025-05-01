const model = require('../City/city_Model')

// post API
const add = async(req, res) => {
    const { city_name, status} = req.body;
    try {
        const existingCity = await model.findOne({ city_name });
        if (existingCity) {
          return res.status(400).json({ message: 'City name already exists' });
        }
        const data = new model({
            city_name, status
        });
        const userdata = await data.save()
        res.send({userdata});
    }
    catch (error){
        if (error.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
            return res.status(400).json({ message: 'City already exists' });
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
const getbyId = async (req, res) => {
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
    const {city_name, status} = req.body;
    try{

        const existingCity = await model.findOne({ city_name, status });
        if (existingCity) {
          return res.status(400).json({ message: 'City name already exists' });
        }
        const data = await model.updateOne(
            {_id: req.params._id},
            { $set: {
                city_name, status
            },}
            
        );
        if (data) {
            res.status(200).send({message: "user update found"});
        }else{
            res.status(300).send({message: "user update not found"});
        }

    } catch (error){
        if (error.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
            return res.status(400).json({ message: 'City already exists' });
        }

        console.log(error);
        return res.status(500).json({ message:'internal servar error'})
    }
};


module.exports = {add, getdata, getbyId, Delete , Update}

