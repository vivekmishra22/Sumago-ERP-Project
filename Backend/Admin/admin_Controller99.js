const AdminModel = require("./admin_Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "mysecretkey"; // Use environment variable in production
const saltRounds = 10;


const registerAdmin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newAdmin = new AdminModel({
            email,
            password: hashedPassword,
            role
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const regi_user = async (req, res) => {
    const { fname,lname,email,password,status}  = req.body;
    // const emailId = req.admin.email; // Extract email from JWT middleware
    try {
      const existingUser = await UserModel.findOne({fname,lname,email,password,status});
  
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const admin = await UserModel.create({fname,lname,email,password: hashedPassword ,status,
        UserId: req.user.id,  // Ensure the user/bde is linked to the logged-in user
      });
  
      const token = jwt.sign({emailId: admin.email, id: admin._id }, secret, { expiresIn: '1h' });
  
      return res.status(201).json({ admin, token });
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
const loginuser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the admin user by email
      const admin = await AdminModel.findOne({ email });

      if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
      }

      // console.log("Entered Password:", password);
      // console.log("Stored Hashed Password:", admin.password);

      // Ensure both values are not undefined or null
      if (!password || !admin.password) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }
const token = jwt.sign({ id: admin._id, email: admin.email }, secret, { expiresIn: '1h' });
      res.json({ message: "Login successful",token });

  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error" });
  }
};

const getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const getbyId = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Delete API
// 
const Delete = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params._id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const Update = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { email, password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




  module.exports = { registerAdmin,regi_user,loginuser,getuser, getbyId,Delete,Update}