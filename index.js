const express = require('express');

const todoRoutes = require('./routes/todo.routes');

const app = express();

const mongoDB = require('./mongodb/mongodb.connect');

mongoDB.connect();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json('Hello World!');
});

module.exports = app;
