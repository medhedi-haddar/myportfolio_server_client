const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { getProjects, getOneProject, addProject,updateProject, deleteProject } = require('../Controllers/project');
const uploadFiles = require('../middleware/uploadFiles')

// GET
router.get('/get_one_project/:id', getOneProject);
router.get('/getprojects', getProjects );

// POST
router.post('/delete_project/:id', auth,deleteProject);
router.post('/add_project',auth,uploadFiles,addProject);
router.post('/update_project',auth,uploadFiles,updateProject)

module.exports = router;