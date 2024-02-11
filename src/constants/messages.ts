export const MESSAGES = {
  WRONG_ROUTE: JSON.stringify({ message: "This route doesn't exist for this operation" }),
  INVALID_TYPES: JSON.stringify({ message: 'Invalid field types' }),
  INVALID_UUID: JSON.stringify({ message: 'Invalid UUID format' }),
  USER_NOT_FOUND: (id: string) => JSON.stringify({ message: `User with id ${id} not found` }),
  MISSED_FIELDS: (requiredFields: string) => JSON.stringify({ message: `Missing required fields: ${requiredFields}` }),
  OPERATION_NOT_FOUND: JSON.stringify({ message: 'This operation not found' }),
  INVALID_BODY: JSON.stringify({ message: 'Invalid body format' }),
};
