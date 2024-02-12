import { MESSAGES, PATH_URL } from '../constants';
import { StatusCodeEnum, responseType } from '../types';
import { parseUrlPath } from '../utils';
import * as UserController from '../controllers/userController';
import { validate } from 'uuid';

export const deleteRoutes = (url: string): responseType => {
  const parsedUrl = parseUrlPath(url);
  if (parsedUrl.startsWith(PATH_URL) && parsedUrl.split('/').length === 5) {
    const id = parsedUrl.split('/').at(3);

    if (id && validate(id)) {
      const index = UserController.deleteUser(id);

      return {
        status: index ? StatusCodeEnum.NO_CONTENT : StatusCodeEnum.NOT_FOUND,
        data: index ? id : MESSAGES.USER_NOT_FOUND(id),
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
