import { NewUserType } from '../types';

export const checkUserTypes = (user: NewUserType) => {
  const { username, age, hobbies } = user;
  if (
    typeof username !== 'string' ||
    typeof age !== 'number' ||
    !Array.isArray(hobbies) ||
    !hobbies.every((el) => typeof el === 'string')
  ) {
    return true;
  }
};
