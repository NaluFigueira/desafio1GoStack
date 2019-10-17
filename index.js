const express = require('express');

const server = express(); 
server.use(express.json());

projetos = [];

server.post('/projects',(req,res) =>{
  const {id,title,tasks} = req.body;

  projetos.push({
    id,
    title,
    tasks
  });

  return res.json(projetos);
});

server.listen(3000);