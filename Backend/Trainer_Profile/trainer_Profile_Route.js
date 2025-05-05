const {add, getdata, getbyId, Update, Delete } = require ('./trainer_Profile_Controller');

const express = require ('express');

const route = express.Router()
const {photoUpload} = require('../fileUpload')

route.post('/addTrainer_profile',photoUpload, add);
route.get('/getTrainer_profile', getdata);
route.get('/getbyIdTrainer_profile/:_id', getbyId);
route.put('/UpdateTrainer_profile/:_id',photoUpload, Update);
route.delete('/deleteTrainer_profile/:_id', Delete);

module.exports = route
