const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js')

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' })
});

server.post('/zoos', (req, res) => {
  const zoo = req.body;

  knex
    .insert(zoo).into('zoos')
    .then(ids => {
      res.status(201).json({ ids })
    })
    .catch(error => {
      res.status(500).json({ message: 'error' });
    });
});

server.get('/zoos', (req, res) => {
  knex('zoos').then(
    zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
    res.status(500).json({ message: 'Error retrieving Zoos' });
  });
});

const port = 3000;
server.listen(port, function () {
  console.log(`Server Listening on ${port}`);
});
