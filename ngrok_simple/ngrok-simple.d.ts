/**
 * Creates a ngrok tunnel.
 * ```js
 * Examples:
 *     const url = await ngrok.connect();//Tunelates in port 80
 *     const url = await ngrok.connect(9090);//Tunelates in port 9090
 *     const url = await ngrok.connect({addr:3030, proto:'http', region:'us'});//Tunelates in port 3030
 *```
 * @param options Optional. Port number or an object with Ngrok options.
 */
export function connect(options?: number | INgrokOptions): Promise<{url: string; pid: number}>;

interface INgrokOptions {
  /**
   * The local host port you want to tunnelate
   * @default 80
   */
  addr?: number | string;
  /**
   * The region where you want tunnelate
   * @default 'us'
   */
  region?: 'us' | 'eu' | 'au' | 'ap' | 'sa' | 'jp' | 'in';
  /**
   * The transfer protocol
   * @default 'http'
   */
  proto?: 'http' | 'tcp';
}

module.exports = {connect};
