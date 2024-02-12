import { usersData } from '../data/data';
import { UserType } from '../types';

export const updateUsersData = (newUsers: UserType[]) => {
  usersData.splice(0, usersData.length, ...newUsers);
};
