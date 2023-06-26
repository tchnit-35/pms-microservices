const express = require("express")
const { isAuth } = require('../../isAuthenticated');
const { createProject, getCurrentProjects, getSingleProject,getFutureProjects,getOldProjects, updateProject, deleteProject, findProject } = require("../controllers/project");
const router = express.Router()
//Retrieve Projects
router.get('/:projectId',isAuth,getSingleProject)
router.get('/current',isAuth,getCurrentProjects)
router.get('/old',isAuth,getOldProjects)
router.get('/future',isAuth,getFutureProjects)

//CRUD operations
router.post('/',isAuth,createProject)
router.patch('/:projectId',isAuth,updateProject)
router.delete('/:projectId',isAuth,deleteProject)

//Search Project
router.get('/',isAuth,findProject)


module.exports = router