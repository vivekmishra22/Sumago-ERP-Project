const model = require('./student_Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecretkey'; // Use environment variable for the secret
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
// const saltRounds = 10;


// Register a new user
const regi_student = async (req, res) => {
  const { student_name, name, duration, date, email, password, status } = req.body;

  try {
    // Validate input
    if (!student_name || !name || !duration || !date || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingStudent = await model.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newStudent = await model.create({
      student_name,
      name,
      duration,
      date,
      email,
      password: hashedPassword,
      status,
    });

    // Generate a token
    const token = jwt.sign({ email: newStudent.email, id: newStudent._id }, secret, { expiresIn: '1h' });

    // ⛔ Remove password from response
    const { password: _, ...studentData } = newStudent.toObject();

    res.status(201).json({ message: 'Student registered successfully', student: studentData, token });
    // res.status(201).json({ student: studentData, token });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
// const loginuser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Find the user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare passwords
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate a token
//     const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '1h' });

//     res.json({ email: user.email, token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const login_student = async (req, res) => {

  const { email, password } = req.body;

  try {
    const student = await model.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, email: student.email }, secret, { expiresIn: '1h' });
    res.json({ message: "login successful..", token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const change = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Extract user ID from the token
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }
    
    const decoded = jwt.verify(token, secret);
    const student = await model.findById(decoded.id);
    // const studentId = decoded.id;

    // Find the user by ID
    // const student = await model.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    student.password = hashedPassword;
    await student.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
};

// Get all student
const getstudent = async (req, res) => {
  try {
    const student = await model.find();
    res.status(200).json({ data: student });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
const getbyId = async (req, res) => {
  try {
    const student = await model.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'student not found' });
    }
    res.status(200).json({ data: student });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user
// const Delete = async (req, res) => {
//   try {
//     const result = await User.deleteOne({ _id: req.params.id });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Delete API
const Delete = async (req, res) => {
  try {
    const data = await model.deleteOne({ _id: req.params.id });
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).send({ message: 'Student deleted successfully', data });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send(error);
  }
};


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
const Update_student = async (req, res) => {
  const { student_name, name, duration, date, email, status, password } = req.body;

  try {
    // Log the request body and parameters for debugging
    // console.log('Request Body:', req.body);
    // console.log('Request Params:', req.params);

    // Extract the student ID from the request parameters
    const studentId = req.params.id; // Use `req.params.id` instead of `req.params._id`
    if (!studentId) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    // Check if password is provided
    let hashedPassword;
    if (password) {
      // Hash the new password
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Prepare the update object
    const updateData = {
      student_name,
      name,
      duration,
      date,
      email,
      status,
    };

    // Add hashed password to the update object if it exists
    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    // Update the student
    const result = await model.updateOne(
      { _id: studentId }, // Use the extracted student ID
      { $set: updateData }
    );

    // Log the update result for debugging
    console.log('Update Result:', result);

    if (result.modifiedCount > 0) {
      res.status(200).send({ success: true, message: 'Data updated successfully', result });
    } else if (result.matchedCount === 0) {
      res.status(404).send({ success: false, message: 'Student not found' });
    } else {
      res.status(400).send({ success: false, message: 'No changes made' });
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { regi_student, login_student, getstudent, getbyId, Delete, Update_student, change };