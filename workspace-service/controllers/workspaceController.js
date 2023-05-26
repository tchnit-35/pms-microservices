const express = require("express")
const { isAuth } = require('../../middlewares/auth');
const Workspace = require("../models/Workspace");
const app = express()

//Returning Workspace

app.post('/workspace',(req,res)=>{
  res.send('Workspace Service Running')
})

//Creating Workspace

app.post('/register/:user_id/workspace',isAuth,(req,res)=>{
  const {name} = req.body
  const newWorkpspace = new Workspace({
    master_id:user_id,
    display_name:name,
  })
  newWorkpspace.save()
  res.json(newWorkpspace)
  res.redirect('/workspace)')
})
