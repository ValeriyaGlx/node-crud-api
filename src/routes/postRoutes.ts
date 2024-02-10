import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodeEnum } from '../types';
import { parseUrlPath } from '../utils';
import * as UserController from '../controllers/userController';

export const postRoutes = async (url: string, req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parseUrlPath(url);

  if (parsedUrl === '/api/users/') {
    await UserController.createUser(req, res);
  } else {
    res.writeHead(StatusCodeEnum.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('post not found'));
  }
};
