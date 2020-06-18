//const databaseUrl = require('./databaseTunnelUrl.json').url;
require('dotenv/config');
const mongoose = require('mongoose');

var stringConnection = process.env.MONGO_URL;

connectDB();

async function connectDB() {
  try {
    await mongoose.connect(stringConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Banco de dados conectado');
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoose;
