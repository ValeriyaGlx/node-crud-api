import { StatusCodeEnum, responseType } from '../types';
import * as UserController from '../controllers/userController';
import { parseUrlPath } from '../utils';
import { validate } from 'uuid';

export const getRoutes = async (url: string): Promise<responseType> => {
  const parsedUrl = parseUrlPath(url);
  switch (parsedUrl) {
    case '/api/users/':
      return {
        status: StatusCodeEnum.OK,
        data: await UserController.getAllUsers(),
      };
    case (parsedUrl.match(/^\/api\/users(?:\/[^/]+)?\/$/) as RegExpMatchArray).at(0):
      const id = parsedUrl.split('/').at(3);
      if (id && validate(id)) {
        const user = await UserController.getUserById(id);
        return {
          status: user ? StatusCodeEnum.OK : StatusCodeEnum.NOT_FOUND,
          data: user ? user : `User with id ${id} not found`,
        };
      } else {
        return {
          status: StatusCodeEnum.BAD_REQUEST,
          data: 'bad uuid Id',
        };
      }
    // TODO default not working
    default:
      return {
        status: StatusCodeEnum.NOT_FOUND,
        data: 'User with id not found',
      };
  }
};
