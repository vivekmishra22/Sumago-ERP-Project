const {regi_user,loginuser,getuser,getbyId,Delete,Update} = require('./hr_Controller');

const express = require('express');

const route = express.Router()
 const auth = require('../Middleware/Authentication');
// const {photoUpload} = require('./fileUpload')

// route.post('/add',addexpense)

route.post('/addhr',regi_user);
route.post('/loginhr', loginuser);

route.get('/gethr',auth,getuser);

route.get('/getByIdhr/:_id',getbyId)
 route.put('/updatehr/:_id',auth,Update)

route.delete('/deletehr/:_id',auth,Delete)

module.exports = route