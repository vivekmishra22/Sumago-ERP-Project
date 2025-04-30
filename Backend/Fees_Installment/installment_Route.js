const {add, getdata, getbyId, Update, Delete,generateReceipt } = require ('./installment_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addinstallment', add);
route.get('/receipt/:id', generateReceipt);
route.get('/getinstallment', getdata);
route.get('/getbyIdinstallment/:_id', getbyId);
route.put('/updateinstallment/:_id', Update);
route.delete('/deleteinstallment/:_id', Delete);

module.exports = route;
