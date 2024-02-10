import { IncomingMessage, ServerResponse } from 'http';
import * as UserModel from '../models/userModel';
import { StatusCodeEnum } from '../types/enums';

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
    const user = {
      username: 'Svyat',
      age: 27,
      hobbies: [],
    };

    const newUser = UserModel.create(user);
    res.writeHead(StatusCodeEnum.CREATED, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};

export { getAllProducts, getProductById, createUser };
