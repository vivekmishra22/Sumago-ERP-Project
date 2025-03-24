const {add, getdata, getbyId, Update, Delete } = require ('./admissionFees_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addAdmissionFees', add);
route.get('/getdataAdmissionFees', getdata);
route.get('/getbyIdAdmissionFees/:_id', getbyId);
route.put('/UpdateAdmissionFees/:_id', Update);
route.delete('/deleteAdmissionFees/:_id', Delete);
// route.post('/addplans',add)


module.exports = route
