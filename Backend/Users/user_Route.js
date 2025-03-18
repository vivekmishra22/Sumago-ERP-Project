const express = require('express');
const router = express.Router();
const { regi_user, loginuser, getuser, getbyId, Delete, Update, change } = require('../Users/user_Controller');
const auth = require('../Middleware/Authentication');

// Public routes
router.post('/add', regi_user);
router.post('/login', loginuser);

// Protected routes
router.post('/change_password', auth, change);
router.get('/getusers', auth, getuser);
router.get('/getById/:id', auth, getbyId);
router.put('/update/:id', auth, Update);
router.delete('/delete/:id', auth, Delete);

module.exports = router;
