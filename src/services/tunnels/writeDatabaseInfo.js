const fs = require('fs');
const {fg} = require('./consoleColors');

function wrtiteDatabaseInfo(databaseInfo) {
  console.log(fg.Cyan, 'Escrevendo a url do banco de dados', fg.White);
  fs.writeFile('./src/database/databaseTunnelUrl.json', JSON.stringify(databaseInfo), err => {
    if (err) throw err;
    console.log(fg.Green, 'Url escrita com sucesso', fg.White);
  });
}

module.exports = wrtiteDatabaseInfo;
