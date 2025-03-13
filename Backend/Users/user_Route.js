const {regi_user,loginuser,getuser,getbyId,Delete,Update} = require('../Users/user_Controller');

const express = require('express');

const route = express.Router();
const auth = require('../Middleware/Authentication');
// const {photoUpload} = require('./fileUpload')

// route.post('/add',addexpense)

route.post('/add',regi_user);
route.post('/login', loginuser);

route.get('/getusers',auth,getuser);

route.get('/getById/:_id',getbyId)
 route.put('/update/:_id',auth,Update)

route.delete('/delete/:_id',auth,Delete)

module.exports = route;