const {add, getdata, getbyId,  Update ,Delete} = require ('../Country/country_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addCountry', add);
route.get('/getdataCountry', getdata);
route.get('/getbyIdCountry/:_id', getbyId);
route.put('/UpdateCountry/:_id', Update);
route.delete('/deleteCountry/:_id', Delete);
// route.post('/addplans',add)


module.exports = route