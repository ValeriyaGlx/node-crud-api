import 'dotenv/config';
import { createServer } from 'http';

import { MethodsEnum, StatusCodeEnum } from './types/enums';
import { deleteRoutes, getRoutes, postRoutes, putRoutes } from './routes';

const PORT = Number(process.env.PORT) || 4000;

const server = createServer(async (req, res) => {
  try {
    switch (req.method) {
      case MethodsEnum.GET:
        const get = async () => {
          const { status, data } = await getRoutes(req.url ?? '');
          res.writeHead(status, { 'Content-Type': 'application/json' });
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
        const deleteUser = async () => {
          const { status, data } = await deleteRoutes(req?.url ?? '');
          res.writeHead(status, { 'Content-Type': 'application/json' });
          res.end(data);
        };
        deleteUser();
        break;

      default:
        res.writeHead(StatusCodeEnum.NOT_FOUND, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'This operation not found' }));
        break;
    }
  } catch (err) {
    res.writeHead(StatusCodeEnum.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server fall' }));
  }
});

server.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}...`);
});
