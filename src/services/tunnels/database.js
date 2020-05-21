const {exec} = require('child_process');
const {fg} = require('./consoleColors');

function startDatabase() {
  return new Promise((resolve, reject) => {
    console.log(fg.Cyan, 'Iniciando MongoDB...', fg.White);
    const databaseProccess = exec('mongod', (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
      }
    });

    databaseProccess.stdout.on('data', async data => {
      const regexDatabaseReady = /\[listener\] waiting for connections on port (\d+)/;
      const regexErrOtherUsing = /Ensure the user [^]* Also make [^]* directory/;
      const resultDatabaseReady = data.match(regexDatabaseReady);
      const resultErrOtherUsing = data.match(regexErrOtherUsing);

      if (resultDatabaseReady) {
        console.log(
          fg.Green,
          `Banco de dados iniciado na porta ${fg.Yellow}${resultDatabaseReady[1]}`,
          fg.White
        );
        resolve(resultDatabaseReady[1]);
      } else if (resultErrOtherUsing) {
        const pid = await getOtherUsingPid();
        reject(
          new Error(
            `${fg.Red}O Banco de dados já está sendo usado no processo de pid ${fg.Yellow}${pid}
            ${fg.White}`
          )
        );
      }
    });
  });
}

function getOtherUsingPid() {
  return new Promise((resolve, reject) => {
    exec('tasklist /fi "imagename eq mongod.exe" /fo list', (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(stderr);
      } else {
        const regexProccess = /Identifica[^]* pessoal:[^d+](\d+)/;
        const resultProccess = stdout.match(regexProccess);
        if (resultProccess) {
          resolve(resultProccess[1]);
        }
      }
    });
  });
}

module.exports = startDatabase;
