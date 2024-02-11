import 'dotenv/config';
import { createServer } from 'http';

import { MethodsEnum, StatusCodeEnum } from './types/enums';
import { deleteRoutes, getRoutes, postRoutes, putRoutes } from './routes';
import { HEADER, MESSAGES } from './constants';

export const createHttpServer = () => {
  const server = createServer((req, res) => {
    try {
      switch (req.method) {
        case MethodsEnum.GET:
          const get = async () => {
            const { status, data } = await getRoutes(req.url ?? '');
            res.writeHead(status, HEADER);
            res.end(data);
          };
          get();
          break;

        case MethodsEnum.POST:
          const post = async () => {
            await postRoutes(req.url ?? '', req, res);
          };
          post();
          break;

        case MethodsEnum.PUT:
          const put = async () => {
            await putRoutes(req.url ?? '', req, res);
          };
          put();
          break;

        case MethodsEnum.DELETE:
          const deleteUser = () => {
            const { status, data } = deleteRoutes(req?.url ?? '');
            res.writeHead(status, HEADER);
            res.end(data);
          };
          deleteUser();
          break;

        default:
          res.writeHead(StatusCodeEnum.NOT_FOUND, HEADER);
          res.end(MESSAGES.OPERATION_NOT_FOUND);
          break;
      }
    } catch (err) {
      res.writeHead(StatusCodeEnum.INTERNAL_SERVER_ERROR, HEADER);
      res.end(JSON.stringify({ message: 'Server fall' }));
    }
  });

  return server;
};
