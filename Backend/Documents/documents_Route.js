const express = require('express');
const { getdata, add, GetuserById, deletedata, putdata } = require('./documents_Controller');

const route = express.Router();

const {photoUpload} = require('../documentsUpload');


// route.post('/upload', photoUpload , add)

route.get('/getdataDocuments', getdata);

route.get('/getuserdataDocuments/:_id', GetuserById);

route.post('/postdataDocuments', photoUpload, add);

route.delete('/deletedataDocuments/:id', deletedata);

route.put('/putdataDocuments/:_id', photoUpload , putdata);


module.exports = route;