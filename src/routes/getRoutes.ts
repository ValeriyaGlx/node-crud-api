import { StatusCodeEnum, responseType } from '../types';
import * as UserController from '../controllers/userController';
import { parseUrlPath } from '../utils';
import { validate } from 'uuid';
import { MESSAGES, PATH_URL } from '../constants';

export const getRoutes = async (url: string): Promise<responseType> => {
  const parsedUrl = parseUrlPath(url);
  if (parsedUrl === PATH_URL && parsedUrl.split('/').length === 4) {
    return {
      status: StatusCodeEnum.OK,
      data: await UserController.getAllUsers(),
    };
  } else if (parsedUrl.startsWith(PATH_URL) && parsedUrl.split('/').length === 5) {
    const id = parsedUrl.split('/').at(3);

    if (id && validate(id)) {
      const user = await UserController.getUserById(id);
      return {
        status: user ? StatusCodeEnum.OK : StatusCodeEnum.NOT_FOUND,
        data: user ? user : MESSAGES.USER_NOT_FOUND(id),
      };
    } else {
      return {
        status: StatusCodeEnum.BAD_REQUEST,
        data: MESSAGES.INVALID_UUID,
      };
    }
  } else {
    return {
      status: StatusCodeEnum.NOT_FOUND,
      data: MESSAGES.WRONG_ROUTE,
    };
  }
};
