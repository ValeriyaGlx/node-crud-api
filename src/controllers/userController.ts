import { IncomingMessage, ServerResponse } from 'http';
import * as UserModel from '../models/userModel';
import { StatusCodeEnum } from '../types/enums';
import { checkUserRequiredFields } from '../utils/checkUserRequiredFields';
import { checkUserTypes } from '../utils';

const getAllProducts = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await UserModel.findAllUsers();
    res.writeHead(StatusCodeEnum.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

// @decs Get user by ID
// @route POST /api/users/:id
const getProductById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await UserModel.findUserById(id);
    res.writeHead(StatusCodeEnum.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (err) {
    res.writeHead(StatusCodeEnum.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User with id ${id} not found` }));
  }
};

// @decs Create a user
// @route POST /api/users
const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);

      const user = {
        username,
        age,
        hobbies,
      };

      const requiredFields = checkUserRequiredFields(user);

      if (requiredFields) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Missing required fields: ${requiredFields}` }));
        return;
      }

      const wrongUsreTypes = checkUserTypes(user);
      if (wrongUsreTypes) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid field types' }));
        return;
      }

      const newUser = await UserModel.create(user);

      res.writeHead(StatusCodeEnum.CREATED, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  } catch (err) {
    res.writeHead(StatusCodeEnum.BAD_REQUEST, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'err' }));
  }
};

export { getAllProducts, getProductById, createUser };
