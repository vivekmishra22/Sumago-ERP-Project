const { add, getdata, getbyId, Delete , Update } = require ('./fee_Controller');

const express = require ('express');

const route = express.Router();

route.post('/addFee', add);
route.get('/getdataFee', getdata);
route.get('/getbyIdFee/:_id', getbyId);
route.put('/UpdateFee/:_id', Update);
route.delete('/deleteFee/:_id', Delete);
// route.post('/addplans',add)


module.exports = route;
