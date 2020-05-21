const requireDir = require('require-dir');
const express = require('express');
requireDir('./src/app/models');
const home = require('./src/routes/home');

const server = express();

//CONFIGS
server.use(express.json());

//ROTAS
server.use('/', home);

server.listen(3100);
