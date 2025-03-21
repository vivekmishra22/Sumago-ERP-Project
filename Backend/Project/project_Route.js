const express = require('express');
const router = express.Router();
const { addProject, getProjects, getProjectById, deleteProject, updateProject } = require('./project_Controller');

// Routes
router.post('/addproject', addProject);
router.get('/getProject', getProjects);
router.get('/getProjectById/:_id', getProjectById);
router.delete('/deleteProject/:_id', deleteProject);
router.put('/updateProject/:_id', updateProject);

module.exports = router;
