import { createServer } from 'http';

import { StatusCodeEnum } from './types/enums';
import { routes } from './routes';
import { HEADER } from './constants';

export const createHttpServer = () => {
  const server = createServer((req, res) => {
    try {
      routes(req, res);
    } catch (err) {
      res.writeHead(StatusCodeEnum.INTERNAL_SERVER_ERROR, HEADER);
      res.end(JSON.stringify({ message: 'Server falled' }));
    }
  });

  return server;
};
