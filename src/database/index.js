const databaseUrl = require('./databaseTunnelUrl.json').url;
const mongoose = require('mongoose');

var stringConnection = `mongodb://${databaseUrl}/marsupialApi`;

connectDB();

async function connectDB() {
  try {
    await mongoose.connect(stringConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Banco de dados conectado');
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoose;
