const writeDatabaseInfo = require('./writeDatabaseInfo');
const startDatabase = require('./database');
const startApi = require('./api');
const {fg} = require('./consoleColors');
const ngrokSimple = require('../../../ngrok_simple');

startNgrokTunnel();

async function startNgrokTunnel() {
  const databasePort = await tryStartAndGetDatabasePort();
  const infoDatabase = await tunnelateAndGetInfoDatabase(databasePort);
  const databaseUrl = getDatabaseUrl(infoDatabase);
  writeDatabaseInfo({url: databaseUrl});
  startApi();
}
async function tryStartAndGetDatabasePort() {
  try {
    return await startDatabase();
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function tunnelateAndGetInfoDatabase(databasePort) {
  const databaseTunnelInfo = await ngrokSimple.connect({
    addr: databasePort,
    region: 'sa',
    proto: 'tcp',
  });
  console.log(
    fg.Green,
    'Banco de dados tunelado na url:',
    fg.Yellow,
    databaseTunnelInfo.url,
    fg.White
  );
  return databaseTunnelInfo;
}

function getDatabaseUrl({url}) {
  const regex = /tcp:\/\/([^]*)/;
  return url.match(regex)[1];
}
