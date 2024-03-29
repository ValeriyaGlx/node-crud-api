import { IncomingMessage, ServerResponse } from 'http';
import * as UserModel from '../models/userModel';
import { StatusCodeEnum } from '../types/enums';
import { checkUserRequiredFields } from '../utils/checkUserRequiredFields';
import { checkUserTypes, sanitazeBody, updateUsersData } from '../utils';
import { HEADER, MESSAGES } from '../constants';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { usersData } from '../data/data';

const getAllUsers = async () => {
  try {
    const users = await UserModel.findAllUsers();
    return JSON.stringify(users) ?? '[ ]';
  } catch (err) {
    return;
  }
};

// @decs Get user by ID
// @route GET /api/users/:id
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
      if (!sanitazeBody(body)) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, HEADER);
        res.end(MESSAGES.INVALID_BODY);
        return;
      }

      const { username, age, hobbies } = JSON.parse(body);

      const user = {
        id: uuidv4(),
        username,
        age,
        hobbies,
      };

      const requiredFields = checkUserRequiredFields(user);

      if (requiredFields) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, HEADER);
        res.end(MESSAGES.MISSED_FIELDS(requiredFields));
        return;
      }

      const wrongUserTypes = checkUserTypes(user);
      if (wrongUserTypes) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, HEADER);
        res.end(MESSAGES.INVALID_TYPES);
        return;
      }

      const newUser = await UserModel.create(user);
      updateUsersData(usersData);

      res.writeHead(StatusCodeEnum.CREATED, HEADER);
      res.end(JSON.stringify(newUser));
    });
  } catch (err) {
    console.log(err);
  }
};

// @decs Delete user by ID
// @route POST /api/users/:id
const deleteUser = (id: string) => {
  try {
    const index = UserModel.deleteUser(id);
    updateUsersData(usersData);
    return index;
  } catch (err) {
    console.log(err);
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
      if (!sanitazeBody(body)) {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, HEADER);
        res.end(MESSAGES.INVALID_BODY);
        return;
      }
      const { username, age, hobbies } = JSON.parse(body);

      const updatedUser = {
        id,
        username,
        age,
        hobbies,
      };

      if (id && validate(id)) {
        const wrongUserTypes = checkUserTypes(updatedUser);
        if (wrongUserTypes) {
          res.writeHead(StatusCodeEnum.BAD_REQUEST, HEADER);
          res.end(MESSAGES.INVALID_TYPES);
          return;
        }

        const newUser = await UserModel.update(updatedUser);
        if (newUser) {
          updateUsersData(usersData);
          res.writeHead(StatusCodeEnum.OK, HEADER);
          res.end(JSON.stringify(newUser));
        } else {
          res.writeHead(StatusCodeEnum.NOT_FOUND, HEADER);
          res.end(MESSAGES.USER_NOT_FOUND(id));
        }
      } else {
        res.writeHead(StatusCodeEnum.BAD_REQUEST, HEADER);
        res.end(MESSAGES.INVALID_UUID);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
