const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers
  const user = users.find(user => user.username === username)
  if(!user) {
    return response.status(400).json({error:" User not found"})
  }
  request.user = user
}

app.post('/users', (request, response) => {
  const { name, username} = request.body
  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  })
  return response.status(201).json({Usuarios: users}).send()
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request
  return response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body
  const { user } = request
  const todosOperation ={
    id: uuidv4(),
    title,
    done: "false",
    deadline,
    created_at: new Date()
  }
  user.todos.push(todosOperation)
  return response.status(201).json([user.todos]).send()
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
