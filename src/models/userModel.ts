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

export { findAllUsers, findUserById, create };

//   update(newUser: Partial<User>): void {
//     if (newUser.username && typeof newUser.username === 'string') {
//       this.username = newUser.username;
//     }
//     if (newUser.age && typeof newUser.username === 'number') {
//       this.age = newUser.age;
//     }
//     if (
//       newUser.hobbies &&
//       Array.isArray(newUser.hobbies) &&
//       newUser.hobbies.every((item) => typeof item === 'string')
//     ) {
//       this.hobbies = newUser.hobbies;
//     }
