const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const { serverLog, validateProjetId } = require("./middleware");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.use(serverLog);
// app.use("/repositories/:id", validateProjetId);

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? repositories.filter((repo) => repo.title.includes(title))
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found!" });
  }

  const repositoryInDataBase = repositories[repositoryIndex];

  const repository = {
    ...repositoryInDataBase,
    title,
    url,
    techs,
  };
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).send({ error: "Repositories not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).send({ error: "Repositories not found." });
  }

  repositories[repositoryIndex].likes += 1;

  return response.status(201).json(repositories[repositoryIndex]);
});

module.exports = app;
