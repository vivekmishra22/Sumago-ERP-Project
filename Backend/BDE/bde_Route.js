const express = require('express');
const router = express.Router();
const { regi_bde, loginuser, getbde, getbyId, Delete, Update, change } = require('../BDE/bde_Controller');
const auth = require('../Middleware/Authentication');

// Public routes
router.post('/registerbde', regi_bde);
router.post('/loginbde', loginuser);

// Protected routes
router.post('/bdechange_password', auth, change);
router.get('/getbde', auth, getbde);
router.get('/ById/:id', auth, getbyId);
router.put('/updatebde/:id', auth, Update);
router.delete('/deletebde/:id', auth, Delete);

module.exports = router;
