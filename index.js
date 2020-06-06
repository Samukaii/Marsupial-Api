const express = require('express');
const cors = require('cors');

require('./src/app/models/user');

const server = express();

//CONFIGS
server.use(express.json());
server.use(cors());

//ROTAS
require('./src/routes/authentication')(server);
require('./src/routes/admin')(server);
server.listen(3100);
