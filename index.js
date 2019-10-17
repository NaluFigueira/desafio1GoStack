const express = require('express');

const server = express(); 
server.use(express.json());

projects = [];


function checkIfProjectExists(req, res, next){
  const {id} = req.params;

  const index = projects.findIndex(project => project.id === id);

  if(index === -1)
    return res.status(400).json({error: "Projeto não encontrado!"})
  else{
    req.project = projects[index];
    req.index = index;
    return next();
  }
}

server.get('/projects',(req,res) =>{
  return res.json(projects);
});

server.post('/projects',(req,res) =>{
  const {id,title} = req.body;

  projects.push({
    id,
    title,
    tasks:[]
  });

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req,res) =>{
  const {title} = req.body;
  
  req.project.tasks.push(title);
  
  return res.json(req.project);

});

server.put('/projects/:id', checkIfProjectExists,(req,res)=>{
  const {title} = req.body;

  req.project.title = title;
  
  return res.json(req.project);

});

server.delete('/projects/:id',checkIfProjectExists,(req,res)=>{

  projects.splice(req.index,1);
  
  return res.send("Removido com sucesso!");
  
})

server.listen(3000);