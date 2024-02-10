import { IncomingMessage, ServerResponse } from 'http';
import * as UserModel from '../models/userModel';
import { StatusCodeEnum } from '../types/enums';
import { checkUserRequiredFields } from '../utils/checkUserRequiredFields';
import { checkUserTypes } from '../utils';
import { MESSAGES } from '../constants';
import { validate } from 'uuid';

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
        res.end(JSON.stringify({ message: MESSAGES.MISSED_FIELDS(requiredFields) }));
        return;
      }

      const wrongUserTypes = checkUserTypes(user);
      if (wrongUserTypes) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: MESSAGES.INVALID_TYPES }));
        return;
      }

      const newUser = await UserModel.create(user);

      res.writeHead(StatusCodeEnum.CREATED, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  } catch (err) {}
};

// @decs Delete user by ID
// @route POST /api/users/:id
const deleteUser = async (id: string) => {
  const userJson = await getUserById(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    const newData = await UserModel.deleteUser(user);
    return JSON.stringify(newData);
  }
};

// @decs Update user by ID
// @route POST /api/users/:id
const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);

      const updatedUser = {
        id,
        username,
        age,
        hobbies,
      };

      if (validate(id)) {
        const wrongUserTypes = checkUserTypes(updatedUser);
        if (wrongUserTypes) {
          res.writeHead(StatusCodeEnum.BAD_REQUEST, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: MESSAGES.INVALID_TYPES }));
          return;
        }

        const newUser = await UserModel.update(updatedUser);

        res.writeHead(StatusCodeEnum.CREATED, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(MESSAGES.INVALID_UUID));
      }
    });
  } catch (err) {}
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
