import { IncomingMessage, ServerResponse } from 'http';
import * as UserModel from '../models/userModel';
import { StatusCodeEnum } from '../types/enums';

const getAllProducts = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await UserModel.findAllUsers();
    res.statusCode = StatusCodeEnum.OK;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await UserModel.findUserById(id);
    res.statusCode = StatusCodeEnum.OK;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(user));
    res.end();
  } catch (err) {
    res.statusCode = StatusCodeEnum.NOT_FOUND;
    res.setHeader('Content-Type', 'application/json');
    res.write('User not found');
    res.end();
  }
};

export { getAllProducts, getProductById };
