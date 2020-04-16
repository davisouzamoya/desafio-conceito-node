const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs } = request.body
    
  const repositorio = { id: uuid()
    ,title, url, techs, likes:0 }
  repositories.push(repositorio)

  return response.json(repositorio)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {title, url, techs } = request.body

  const repositorioIndex = repositories.findIndex(repository => repository.id === id)
  
  if(repositorioIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }
  const project = { 
    id,
    title,
    url,
    techs,
    likes:repositories[repositorioIndex].likes
  }

  repositories[repositorioIndex] = project

  return response.json(project)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositorioIndex = repositories.findIndex(repository => repository.id === id)

  if(repositorioIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }
  
  repositories.splice(repositorioIndex,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params


  const repositorioIndex = repositories.findIndex(repository => repository.id === id)


  if(repositorioIndex < 0){
    return response.status(400).json({error: 'Project not found'})
  }

    repositories[repositorioIndex].likes += 1;

  return response.json({ likes: repositories[repositorioIndex].likes })

});

module.exports = app;
