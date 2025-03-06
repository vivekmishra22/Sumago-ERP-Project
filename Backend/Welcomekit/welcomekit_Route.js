const {add, getdata,getbyIdwelcomekit, deletewelcomekit, Updatewelcomekit} = require ('./welcomekit_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addkititem', add);
route.get('/getkititem', getdata);
route.get('/getbyIdkititem/:_id', getbyIdwelcomekit);
route.put('/Updatekititem/:_id', Updatewelcomekit);
route.delete('/deletekititem/:_id', deletewelcomekit);
// route.post('/addplans',add)


module.exports = route;
