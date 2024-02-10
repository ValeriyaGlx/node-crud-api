import { IncomingMessage, ServerResponse } from 'http';
import * as UserModel from '../models/userModel';
import { StatusCodeEnum } from '../types/enums';
import { checkUserRequiredFields } from '../utils/checkUserRequiredFields';
import { checkUserTypes } from '../utils';

const getAllUsers = async () => {
  try {
    const users = await UserModel.findAllUsers();
    return JSON.stringify(users) ?? '';
  } catch (err) {
    return;
  }
};

// @decs Get user by ID
// @route POST /api/users/:id
const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findUserById(id);
    return JSON.stringify(user);
  } catch (err) {
    return;
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

      const wrongUserTypes = checkUserTypes(user);
      if (wrongUserTypes) {
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

export { getAllUsers, getUserById, createUser };
