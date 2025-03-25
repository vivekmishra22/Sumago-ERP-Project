const express = require('express');
const { add, getdata, getbyId, Update, Delete } = require('../Batch/batch_Controller');

const route = express.Router();

// Create a new batch
route.post('/addBatch', add);

// Get all batches
route.get('/getAllBatches', getdata);

// Get a batch by ID
route.get('/getBatchById/:id', getbyId);

// Update a batch by ID
route.put('/updateBatch/:id', Update);

// Delete a batch by ID
route.delete('/deleteBatch/:id', Delete);

module.exports = route;
