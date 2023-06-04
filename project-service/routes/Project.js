const express = require("express")
const { isAuth } = require('../../middlewares/auth');
const { createProject, getCurrentProjects, getSingleProject,getFutureProjects,getOldProjects, updateProject, deleteProject, findProject } = require("../controllers/project");

const router = express.Router()
//Retrieve Projects
router.get('/:projectId',getSingleProject)
router.get('/current',getCurrentProjects)
router.get('/old',getOldProjects)
router.get('/future',getFutureProjects)
//CRUD operations
router.post('/create',createProject)
router.patch('/:projectId',updateProject)
router.delete('/:projectId',deleteProject)
//Search Project
router.get('/',findProject)

module.exports = router