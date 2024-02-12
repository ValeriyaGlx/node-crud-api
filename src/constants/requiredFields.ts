import { NewUserType } from '../types';

export const requiredFields: (keyof NewUserType)[] = ['username', 'age', 'hobbies'];
