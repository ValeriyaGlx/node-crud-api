import { requiredFields } from '../constants';
import { NewUserType } from '../types';

export const checkUserRequiredFields = (user: NewUserType) => {
  const missingFields = requiredFields.filter((field) => user[field] === undefined);

  if (missingFields.length > 0) {
    return missingFields.join(', ');
  }
};
