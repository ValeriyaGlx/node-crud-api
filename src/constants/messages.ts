export const MESSAGES = {
  WRONG_ROUTE: "This route doesn't exist for this operation",
  INVALID_TYPES: 'Invalid field types',
  INVALID_UUID: 'Invalid UUID format',
  USER_NOT_FOUND: (id: string) => `User with id ${id} not found`,
  MISSED_FIELDS: (requiredFields: string) => `Missing required fields: ${requiredFields}`,
};
