const express = require('express');
const router = express.Router();
const {regi_student, login_student, getstudent, getbyId, Delete, Update_student, change } = require('./student_Controller');
const auth = require('../Middleware/Authentication');

// Public routes
router.post('/addstudent',regi_student);
router.post('/studentlogin', login_student);

// Protected routes
router.post('/change_password', auth, change);
router.get('/get_students', auth,getstudent);
router.get('/getstudentById/:id', auth, getbyId);
router.put('/update_stud/:id',auth,Update_student);
router.delete('/deletestudent/:id', auth, Delete);

module.exports = router;
