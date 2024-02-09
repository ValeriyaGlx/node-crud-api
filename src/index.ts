import 'dotenv/config';
import { createServer } from 'http';

import * as UserController from './controllers/userController';
import { MethodsEnum } from './types/enums';

const PORT = Number(process.env.PORT) || 4000;

const server = createServer(async (req, res) => {
  console.log(req.url?.split('/'));

  if (req.url?.startsWith('/api/users') && req.method === MethodsEnum.GET && req.url.split('/').length === 4) {
    UserController.getProductById(req, res, req.url.split('/')[3]);
  } else if (req.url === '/api/users' && req.method === MethodsEnum.GET) {
    UserController.getAllProducts(req, res);
  }
});

server.listen(PORT, () => {
  process.stdout.write(`Server started on port: ${PORT}...`);
});
