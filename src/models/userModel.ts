import { usersData } from '../data/data';

type UserType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export type UsersDataType = UserType[] | [];

const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    resolve(usersData);
  });
};

const findUserById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = usersData.find((user) => user.id === id);
    user ? resolve(user) : reject(false);
  });
};

export { findAllUsers, findUserById };

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
