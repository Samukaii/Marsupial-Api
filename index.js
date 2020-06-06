const express = require('express');
const cors = require('cors');
require('dotenv/config');

require('./src/app/models/user');

const server = express();

//CONFIGS
server.use(express.json());
server.use(cors());

//ROTAS
require('./src/routes/authentication')(server);
require('./src/routes/admin')(server);
server.listen(process.env.PORT || 3100);
