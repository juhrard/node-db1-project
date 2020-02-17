const express = require('express');

const db = require('./data/dbConfig.js');

const router = require('./routers/router');

const server = express();

server.use(express.json());

server.use('/api/accounts', router);

server.get('/', (req, res) => {
  res.send('<h3>KNEX DB PRACTICE</h3>');
});

module.exports = server;