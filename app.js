const express = require('express');

const todoRoutes = require('./routes/todo.routes');

const app = express();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json('Hello World!');
});

// app.listen(3000, () => {
//   console.log('SERVER IS NOW RUNNING!');
// });

module.exports = app;
