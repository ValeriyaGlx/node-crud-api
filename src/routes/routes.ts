import { IncomingMessage, ServerResponse } from 'http';
import { HEADER, MESSAGES } from '../constants';
import { MethodsEnum, StatusCodeEnum } from '../types';
import { deleteRoutes } from './deleteRoutes';
import { getRoutes } from './getRoutes';
import { postRoutes } from './postRoutes';
import { putRoutes } from './putRoutes';
import { usersData } from '../data/data';

export const routes = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case MethodsEnum.GET:
      const get = async () => {
        const { status, data } = await getRoutes(req.url ?? '');
        console.log(usersData);
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
};
