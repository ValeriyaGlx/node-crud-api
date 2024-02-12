import cluster from 'node:cluster';
import { UserType } from '../types';

export const updateUsersDataInMulti = async (users: UserType[]) => {
  if (cluster.isWorker && process.send) {
    process.send({ type: 'update', data: users });
  }
};
