const findHttpMessage = /url=(https:\/\/\w+\.*\w*\.ngrok\.io)/;
const findTcpMessage = /url=(tcp:\/\/\w+\.tcp\.*\w*\.ngrok\.io:\w+)/;

const findErrNetworkConnection = /msg="failed to reconnect session" [^]*(?=no such host)no such host"/;
const findErrClientLimit = /err="Your account '((?:[^'])*)' is limited to 1 simultaneous ngrok client session/;

module.exports = {
  findHttpMessage,
  findTcpMessage,
  findErrNetworkConnection,
  findErrClientLimit,
};
