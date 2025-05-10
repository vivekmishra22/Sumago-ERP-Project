const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, getStudents, getbyIdStudent, deleteStudent, updateStudent, changeStudent } = require('./student_Controller');
const auth = require('../Middleware/Authentication');

// Public routes
router.post('/addstudent',registerStudent);
router.post('/studentlogin', loginStudent);

// Protected routes
router.post('/change_password', auth, changeStudent);
router.get('/getStudents', auth, getStudents);
router.get('/getstudentById/:id', auth, getbyIdStudent);
router.put('/update_stud/:id',auth,updateStudent);
router.delete('/deletestudent/:id', auth, deleteStudent);

module.exports = router;
