const express = require('express');
require('./src/app/models/user');

const server = express();

//CONFIGS
server.use(express.json());

//ROTAS
require('./src/routes/authentication')(server);
server.listen(3100);
