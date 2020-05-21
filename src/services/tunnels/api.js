const {exec} = require('child_process');
const {fg} = require('./consoleColors');

function startApi() {
  console.log(fg.Cyan, 'Iniciando Api...', fg.White);
  const api = exec('cd C:/Samuka/APIS/Marsupial-Api && npm run node', (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      reject(err);
    } else {
      console.log(stdout);
    }
  });

  api.stdout.on('data', data => {
    console.log(data);
  });
}

module.exports = startApi;
