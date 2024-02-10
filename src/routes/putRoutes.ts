import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodeEnum } from '../types';
import { parseUrlPath } from '../utils';
import * as UserController from '../controllers/userController';
import { MESSAGES, PATH_URL } from '../constants';

export const putRoutes = async (url: string, req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parseUrlPath(url);

  if (parsedUrl.startsWith(PATH_URL) && parsedUrl.split('/').length === 5) {
    const id = parsedUrl.split('/').at(3);
    await UserController.updateUser(req, res, id ?? '');
  } else {
    {
      res.writeHead(StatusCodeEnum.NOT_FOUND, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: MESSAGES.WRONG_ROUTE }));
    }
  }
};
