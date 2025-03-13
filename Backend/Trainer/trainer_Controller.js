// const Model = require('./Model');
const UserModel = require('./trainer_Model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;
const secret = 'mysecretkey';
const saltRounds = 10; // Number of salt rounds for bcrypt
//post the user details for logins
const regi_user = async (req, res) => {
    const { fname,lname,email,password,cpassword,status}  = req.body;
  
    try {
      const existingUser = await UserModel.findOne({fname,lname,email,password,cpassword,status});
  
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const admin = await UserModel.create({fname,lname,email,cpassword,password: hashedPassword ,status});
  
      const token = jwt.sign({email: admin.email, id: admin._id }, secret, { expiresIn: '1h' });
  
      return res.status(201).json({ admin, token });
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };



//login to user account
   const loginuser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await UserModel.findOne({ email});
  
      if (!admin) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the hashed password with the provided password
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ email: admin.email, id: admin.id }, secret, { expiresIn: '1h' });
  
      return res.json({ email:admin.email,password:admin.password, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  const getuser = async (req, res) => {
      try {
          const data = await UserModel.find();
          res.status(200).send({ data });
      } catch (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
      }
  };

// getById API
const getbyId = async (req, res) => {
    try{
        const data = await UserModel.findOne({_id: req.params})
        res.status(200).send({data});
    }catch (error) {
        console.log(error);
    }
}

// Delete API
const Delete = async (req, res) => {
    try{
        const userdata = await UserModel.deleteOne({_id: req.params._id})
        res.status(200).send({userdata});
    }catch (error) {
        // console.log(err);
        res.status(500).send(err);
    }
}


//Update API
const Update = async (req, res) => {
    const {fname,lname,email,password,cpassword,status} = req.body;
    try{
        
        const data = await UserModel.updateOne(
            {_id: req.params._id},
            { $set: {
              fname,
              lname,
              email,
              password,
              cpassword,
              status
            },}
            
        );
        if (data) {
            res.status(200).send({message: "user update found"});
        }else{
            res.status(300).send({message: "user update not found"});
        }

    }catch (error){
       console.log(error);
        res.status(500).send({message: " Internal server error"})
    }
};


module.exports = {regi_user,loginuser,getuser, getbyId,Delete,Update}