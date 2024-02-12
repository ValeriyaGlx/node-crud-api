import http, { IncomingMessage, ServerResponse } from 'http';

export const forwardRequest = (req: IncomingMessage, res: ServerResponse, port: number) => {
  const options = {
    port: port,
    host: 'localhost',
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  console.log(options.port + ' port worked');

  const proxy = http.request(options, (workerRes) => {
    res.writeHead(workerRes.statusCode as number, workerRes.headers);
    workerRes.pipe(res);
  });

  req.pipe(proxy);
};
