const model = require('../BDE/bde_Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecretkey'; // Use environment variable for the secret
const saltRounds = 10;


// Register a new user
const regi_bde = async (req, res) => {
  const { fname, lname, email, password, status } = req.body;

  try {
    // // Validate input
    // if (!fname || !lname || !email ||  || !password || !status) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }

    // Check if the user already exists
    const existingUser = await model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newBDE = await model.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      status,
    });

    // Generate a token
    const token = jwt.sign({ email: newBDE.email, id: newBDE._id }, secret, { expiresIn: '1h' });

    res.status(201).json({ BDE: newBDE, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// login
const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const BDE = await model.findOne({ email });
    if (!BDE) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, BDE.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: BDE._id, email: BDE.email }, secret, { expiresIn: '1h' });
    res.json({ message: 'login successfull..',token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Change password
const change = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Extract user ID from the token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    // Find the user by ID
    const user = await model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
};

// Get all users
const getbde = async (req, res) => {
  try {
    const bde= await model.find();
    res.status(200).json({ data: bde });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
const getbyId = async (req, res) => {
  try {
    const bde = await model.findById(req.params.id);
    if (!bde) {
      return res.status(404).json({ message: 'BDE not found' });
    }
    res.status(200).json({ data: bde });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete API
const Delete = async (req, res) => {
    try{
        const userdata = await model.deleteOne({_id: req.params._id})
        if (result.deletedCount === 0) {
                 return res.status(404).json({ message: 'User not found' });
               }
        res.status(200).send({message:"Deleted Successfully..",userdata});
    }catch (error) {
        // console.log(err);
        res.status(500).send(err);
    }
}

// // Refresh token endpoint
//   app.post('/refresh-token', (req, res) => {
//     const { refreshToken } = req.body;
//     if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });
  
//     jwt.verify(refreshToken, refreshSecret, (err, user) => {
//       if (err) return res.status(403).json({ message: 'Invalid refresh token' });
  
//       const newAccessToken = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '1h' });
//       res.json({ accessToken: newAccessToken });
//     });
//   });

// Update user
const Update = async (req, res) => {
  const { fname, lname, email, status } = req.body;

  try {
    const updatedUser = await model.findByIdAndUpdate(
      req.params.id,
      { fname, lname, email, status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { regi_bde, loginuser, getbde, getbyId, Delete, Update, change };