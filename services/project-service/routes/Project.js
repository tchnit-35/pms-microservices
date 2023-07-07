const express = require("express")
const { isAuth } = require('../../isAuthenticated');
// const { isAdmin } = require('../../checkPermission')
const { createProject, getCurrentProjects, getSingleProject,getFutureProjects,getOldProjects, updateProject, deleteProject, findProject, inviteToProject, joinProject, getAllUserProjects, getProjectUsers } = require("../controllers/project");
const router = express.Router()
//Retrieve Projects
router.get('/',isAuth,getAllUserProjects)
router.get("/current",isAuth,getCurrentProjects)
router.get('/old',isAuth,getOldProjects)
router.get('/future',isAuth,getFutureProjects)
router.get('/:projectId',isAuth,getSingleProject)
router.get('/:projectId/users',isAuth,getProjectUsers)

//CRUD operations
router.post('/',isAuth,createProject) 
router.patch('/:projectId',isAuth,updateProject)
router.delete('/:projectId',isAuth,deleteProject)

//Search Project   
router.get('/',isAuth,findProject)

//Project Invitations
router.post('/:projectId/invite',isAuth,inviteToProject)
router.get('/:projectId/join',isAuth,joinProject)


module.exports = router