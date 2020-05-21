const {ERRCLIENT, ERRNETWORK, RESHTTP, RESTCP} = require('./constants');
const {errNetworkConnection, errClientLimit} = require('./messages');
const {findErrClientLimit, findErrNetworkConnection} = require('./regex');
const {findHttpMessage, findTcpMessage} = require('./regex');
const bin = __dirname + './bin/ngrok.exe';
const baseDir = __dirname + './bin';
const {spawn, exec} = require('child_process');

function connect(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const defaultedOptions = getDefaultValues(options);
      const tunnelProccess = startAndGetProccess(defaultedOptions);
      const tunnelInfo = await getTunnelInfo(tunnelProccess);
      resolve(tunnelInfo);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

function getDefaultValues(options) {
  let isNumber = typeof options === 'number';
  let isObject = typeof options === 'object';
  let defaultOptions = {
    addr: '80',
    proto: 'http',
    region: 'us',
  };

  if (options) {
    let {assign} = Object;
    if (isNumber) assign(defaultOptions, {addr: options.toString()});
    if (isObject) {
      let {addr, proto, region} = options;
      if (addr) assign(defaultOptions, {addr: addr.toString()});
      if (proto) assign(defaultOptions, {proto: proto});
      if (region) assign(defaultOptions, {region: region});
    }
  }
  return defaultOptions;
}

function startAndGetProccess({proto, addr, region}) {
  const proccess = spawn(bin, [proto, addr, `--region=${region}`, '--log=stdout'], {
    cwd: baseDir,
  });

  return proccess;
}

function getTunnelInfo(tunnelProccess) {
  return new Promise((resolve, reject) => {
    const {stdout, pid} = tunnelProccess;

    stdout.setEncoding('utf8');
    stdout.on('data', matchResultsWithRegex);

    function matchResultsWithRegex(data) {
      const [result, type] = findMatchResults(data);
      if (type === RESHTTP) resolve({url: result[1], pid: pid});
      if (type === RESTCP) resolve({url: result[1], pid: pid});
      if (type === ERRNETWORK) reject(new Error(errNetworkConnection));
      if (type === ERRCLIENT) reject(new Error(errClientLimit));
    }
  });
}

function findMatchResults(data) {
  const resultHttpMessage = data.match(findHttpMessage);
  const resultTcpMessage = data.match(findTcpMessage);
  const resultErrNetworkConnection = data.match(findErrNetworkConnection);
  const resultErrClientLimit = data.match(findErrClientLimit);
  //Returns
  if (resultHttpMessage) return [resultHttpMessage, RESHTTP];
  else if (resultTcpMessage) return [resultTcpMessage, RESTCP];
  else if (resultErrNetworkConnection) return [resultErrNetworkConnection, ERRNETWORK];
  else if (resultErrClientLimit) return [resultErrClientLimit, ERRCLIENT];
  else return [null, null];
}

module.exports = {
  connect,
};
