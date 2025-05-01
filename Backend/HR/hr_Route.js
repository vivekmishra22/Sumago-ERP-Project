const express = require('express');
const router = express.Router();
const { regi_hr, loginhr, gethr, getbyId, Delete, Update, change } = require('../HR/hr_Controller');
const auth = require('../Middleware/Authentication');

// Public routes
router.post('/addhr', regi_hr);
router.post('/login_hr', loginhr);

// Protected routes
router.post('hrchange_password', auth, change);
router.get('/gethr', auth, gethr);
router.get('/gethrById/:id', auth, getbyId);
router.put('/updatehr/:id', auth, Update);
router.delete('/deletehr/:id', auth, Delete);

module.exports = router;
