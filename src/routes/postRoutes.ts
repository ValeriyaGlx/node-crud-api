import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodeEnum } from '../types';
import { parseUrlPath } from '../utils';
import * as UserController from '../controllers/userController';
import { MESSAGES, PATH_URL } from '../constants';

export const postRoutes = async (url: string, req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parseUrlPath(url);

  if (parsedUrl === PATH_URL) {
    await UserController.createUser(req, res);
  } else {
    res.writeHead(StatusCodeEnum.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: MESSAGES.WRONG_ROUTE }));
  }
};
