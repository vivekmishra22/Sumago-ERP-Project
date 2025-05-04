const {add, getdata, getbyId, Update, Delete } = require ('../Kit_FeesPaid/kit_Feespaid_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addKit_FeesPaid', add);
route.get('/getdataKit_FeesPaid', getdata);
route.get('/getbyIdKit_FeesPaid/:_id', getbyId);
route.put('/UpdateKit_FeesPaid/:_id', Update);
route.delete('/deleteKit_FeesPaid/:_id', Delete);
// route.post('/addplans',add)


module.exports = route
