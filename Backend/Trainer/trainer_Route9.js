const express = require('express');
const router = express.Router();
const { regi_trainer, loginuser, get_trainer, getbyId, Delete, Update, change } = require('./trainer_Controller');
const auth = require('../Middleware/Authentication');

// Public routes
router.post('/add_trainer', regi_trainer);
router.post('/login_trainer', loginuser);

// Protected routes
router.post('/change_password', auth, change);
router.get('/gettrainer', auth, get_trainer);
router.get('/trainerById/:id', auth, getbyId);
router.put('/updatetrainer/:id', auth, Update);
router.delete('/deletetrainer/:id', auth, Delete);

module.exports = router;
