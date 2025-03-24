const UserModel = require("../Users/user_Model");
const AdminModel = require("./admin_Model"); // Correct model usage
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "mysecretkey"; // Use environment variable in production
const saltRounds = 10;

// ✅ Admin-Only User Registration
// const regi_user = async (req, res) => {
//   try {
//     // Check if the logged-in user is an admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Only admin can add users." });
//     }

//     const { fname, lname, email, password, status, role } = req.body;
//     const existingUser = await UserModel.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     // Hash password before storing
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = await UserModel.create({ fname, lname, email, password: hashedPassword, status, role });

//     return res.status(201).json({ message: "User added successfully", newUser });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

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

// const regi_user = async (req, res) => {
//   try {
//     const { email, role } = req.body;
//     const UserId = req.user.id; // Assuming the logged-in admin is adding a user

//     if (!UserId) {
//       return res.status(400).json({ message: "UserId is required" });
//     }

//     const newUser = new UserModel({ UserId, email, role });
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully", newUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


//  const loginuser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await AdminModel.findOne({ email });

//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, admin.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { email: admin.email, id: admin._id, role: "admin" },
//       secret,
//       { expiresIn: "1h" }
//     );

//     return res.json({ email: admin.email, token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }

// };

// Change Password API
// const changePassword = async (req, res) => {
//   try {
//       const { oldPassword, newPassword } = req.body;
//       const userId = req.user.id; // Extracted from JWT token

//       const admin = await model.findById(userId);
//       if (!admin) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       // Check if the old password matches the stored password
//       const isPasswordCorrect = await bcrypt.compare(oldPassword, admin.password);
//       if (!isPasswordCorrect) {
//           return res.status(400).json({ message: 'Old password is incorrect' });
//       }

//       // Hash the new password
//       const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//       // Update password in the database
//       admin.password = hashedPassword;
//       await admin.save();

//       return res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// };
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


// getById API
// const getbyId = async (req, res) => {
//     try{
//         const data = await model.findOne({_id: req.params})
//         res.status(200).send({data});
//     }catch (error) {
//         console.log(error);
//     }
// }

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



//Update API
// const Update = async (req, res) => {
//     const {email,password} = req.body;
//     try{
        
//         const data = await model.updateOne(
//             {_id: req.params._id},
//             { $set: {
             
//               email,
//               password,
             
//             },}
            
//         );
//         if (data) {
//             res.status(200).send({message: "user update found"});
//         }else{
//             res.status(300).send({message: "user update not found"});
//         }

//     }catch (error){
//        console.log(error);
//         res.status(500).send({message: " Internal server error"})
//     }
// };


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