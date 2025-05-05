const express = require('express');
const { add, getdata, getbyId, Update, Delete } = require('./students_batch_Controller');

const route = express.Router();

// Create a new batch
route.post('/addSutedentBatch', add);

// Get all Sutedentbatches
route.get('/getSutedentBatch', getdata);

// Get a Sutedentbatch by ID
route.get('/getSutedentBatchById/:id', getbyId);

// Update a Sutedentbatch by ID
route.put('/updateSutedentBatch/:id', Update);

// Delete a Sutedentbatch by ID
route.delete('/deleteSutedentBatch/:id', Delete);

module.exports = route;
