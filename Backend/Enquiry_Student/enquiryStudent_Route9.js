const {add, getdata, getbyId, Update, Delete } = require ('../Enquiry_Student/enquiryStudent_Controller');

const express = require ('express');

const route = express.Router()

route.post('/addEnquiry_Student', add);
route.get('/getEnquiry_Student', getdata);
route.get('/getbyIdCollege/:_id', getbyId);
route.put('/UpdateEnquiry_Student/:_id', Update);
route.delete('/deleteEnquiry_Student/:_id', Delete);

module.exports = route;
