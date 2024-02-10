import { v4 as uuidv4 } from 'uuid';

import { usersData } from '../data/data';
import { NewUserType, UserType } from '../types';

const findAllUsers = () => {
  return new Promise((resolve) => {
    resolve(usersData);
  });
};

const findUserById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = usersData.find((user) => user.id === id);
    user ? resolve(user) : reject(false);
  });
};

const create = (user: NewUserType) => {
  return new Promise((resolve) => {
    const newUser: UserType = {
      id: uuidv4(),
      ...user,
    };
    usersData.push(newUser);
    resolve(newUser);
  });
};

const deleteUser = (user: UserType) => {
  const index = usersData.findIndex((usr) => usr.id === user.id);
  if (index !== -1) {
    usersData.splice(index, 1);
  }
  //TODO вывести пустой массив
  return new Promise((resolve) => resolve(usersData));
};

const update = (user: UserType) => {
  const index = usersData.findIndex((usr) => usr.id === user.id);
  usersData[index] = user;
  return new Promise((resolve) => resolve(usersData[index]));
};

export { findAllUsers, findUserById, create, deleteUser, update };
