const databaseUrl = require('./databaseTunnelUrl.json').url;
const mongoose = require('mongoose');

var stringConnectionDatabase = `mongodb://${databaseUrl}/marsupialApi`;
connectDB();

async function connectDB() {
  await mongoose.connect(stringConnectionDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Banco de dados conectado');
}

module.exports = mongoose;
