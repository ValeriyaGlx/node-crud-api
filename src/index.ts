import 'dotenv/config';
import { createServer } from 'http';

import * as UserController from './controllers/userController';
import { MethodsEnum } from './types/enums';
import { parseUrlPath } from './utils';

const PORT = Number(process.env.PORT) || 4000;

const server = createServer(async (req, res) => {
  const parsedPath = parseUrlPath(req);

  console.log(parsedPath);

  // TODO: /api/usersjfjfj bug
  if (req.url?.startsWith('/api/users')) {
    switch (parsedPath?.length) {
      case 2:
        if (req.method === MethodsEnum.GET) UserController.getAllProducts(req, res);
        if (req.method === MethodsEnum.POST) UserController.createUser(req, res);
        break;
      case 3:
        if (req.method === MethodsEnum.GET) UserController.getProductById(req, res, parsedPath.pop() ?? '');
        break;
      default:
        res.end(JSON.stringify({ message: 'This route not found' }));
        break;
    }
  } else {
    res.end(JSON.stringify({ message: 'This route not found' }));
  }
});

server.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}...`);
});
