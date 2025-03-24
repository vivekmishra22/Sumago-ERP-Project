const {add, getdata, getbyId, Update, Delete } = require ('../Duration/duration_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addDuration', add);
route.get('/getdataDuration', getdata);
route.get('/getbyIdDuration/:_id', getbyId);
route.put('/UpdateDuration/:_id', Update);
route.delete('/deleteDuration/:_id', Delete);
// route.post('/addplans',add)


module.exports = route
