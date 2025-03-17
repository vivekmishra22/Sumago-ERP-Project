const { add, getdata, getbyId, Update, Delete } = require('./feedback_Controller');

const express = require('express');
const router = express.Router();

router.post('/addFeedback', add);
router.get('/getFeedbacks', getdata);
router.get('/getFeedbackById/:id', getbyId);
router.put('/updateFeedback/:id', Update);
router.delete('/deleteFeedback/:id', Delete);

module.exports = router;
