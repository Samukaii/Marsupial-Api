//const databaseUrl = require('./databaseTunnelUrl.json').url;
const mongoose = require('mongoose');
require('dotenv/config');

//var stringConnection = `mongodb://${databaseUrl}/marsupialApi`;

connectDB();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Banco de dados conectado');
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoose;
