const model = require('./welcomekit_Model')

// post API
const add = async(req, res) => {
    const {  welcome_kit, status} = req.body;
    try {
        const existingWelcomekit = await model.findOne({  welcome_kit });
        if (existingWelcomekit) {
          return res.status(400).json({ message: 'Welcomekit item already exists' });
        }
        const data = new model({
            welcome_kit, status
        });
        const userdata = await data.save()
        res.send({userdata});
    }
    catch (error){
        if (error.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
            return res.status(400).json({ message: 'Welcomekit item already exists' });
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
const getbyIdwelcomekit = async (req, res) => {
    try{
        const data = await model.findOne({_id: req.params})
        res.status(200).send({data});
    }catch (error) {
        console.log(error);
    }
}

// Delete API
const deletewelcomekit = async (req, res) => {
    try{
        const userdata = await model.deleteOne({_id: req.params._id})
        res.status(200).send({userdata});
    }catch (error) {
        // console.log(err);
        res.status(500).send(err);
    }
}


//Update API
const Updatewelcomekit = async (req, res) => {
    const { welcome_kit, status} = req.body;
    try{
        const existingWelcomekit = await model.findOne({  welcome_kit });
        if (existingWelcomekit) {
          return res.status(400).json({ message: 'Welcomekit item already exists' });
        }
        const data = await model.updateOne(
            {_id: req.params._id},
            { $set: {
                welcome_kit, status
            },}
            
        );
        if (data) {
            res.status(200).send({message: "Item update found"});
        }else{
            res.status(300).send({message: "Item update not found"});
        }

    }catch (error){
        if (error.code === 11000) { // 11000 is the error code for duplicate key in MongoDB
            return res.status(400).json({ message: 'Welcomekit item already exists' });
        }
        console.log(error);
        res.status(500).send({message: " Internal server error"})
    }
};


module.exports = {add, getdata, getbyIdwelcomekit, deletewelcomekit, Updatewelcomekit}

