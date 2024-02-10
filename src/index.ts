import 'dotenv/config';
import { createServer } from 'http';

import { MethodsEnum } from './types/enums';
import { getRoutes, postRoutes } from './routes';

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
        break;

      case MethodsEnum.DELETE:
        break;

      default:
        res.end(JSON.stringify({ message: 'This operation not found' }));
        break;
    }
  } catch (err) {}
});

server.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}...`);
});
