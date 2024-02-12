import supertest from 'supertest';
import { NewUserType, StatusCodeEnum } from '../types';
import { createHttpServer } from '../server';
import { MESSAGES } from '../constants';

const server = createHttpServer();
const request = supertest(server);

const MOCK_ID = 'adfd01fb-309b-4e1c-9117-44d003f5d7fc';
const MOCK_NEW_USER: NewUserType = { username: 'Mock', age: 28, hobbies: ['have', 'fun'] };
const MOCK_UPDATE_WRONG_USER = { username: 12, age: 'wrong type', hobbies: ['have', 'fun'] };
const MOCK_UPDATE_RIGHT_USER = { username: 'John Mock', age: 35, hobbies: ['write tests', 'give up'] };

jest.mock('uuid', () => ({ v4: () => MOCK_ID, validate: () => true }));

describe('Scenario #1', () => {
  afterAll(() => server.close());

  test('- get all users (empty array expected)', async () => {
    const response = await request.get('/api/users/');
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toBeInstanceOf(Array);
  });
  test('- add new user, get new user as response', async () => {
    const result = await request.post('/api/users/').send(MOCK_NEW_USER);
    expect(result.statusCode).toBe(StatusCodeEnum.CREATED);
    expect(result.body).toEqual({ ...MOCK_NEW_USER, id: MOCK_ID });
  });
  test('- get all users again', async () => {
    const response = await request.get('/api/users/');
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toEqual([{ ...MOCK_NEW_USER, id: MOCK_ID }]);
  });
  test('- find new user by id', async () => {
    const response = await request.get(`/api/users/${MOCK_ID}`);
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toEqual({ ...MOCK_NEW_USER, id: MOCK_ID });
  });
  test('- update this user by id with wrong data types', async () => {
    const response = await request.put(`/api/users/${MOCK_ID}`).send(MOCK_UPDATE_WRONG_USER);
    expect(response.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
    expect(response.body).toEqual(JSON.parse(MESSAGES.INVALID_TYPES));
  });
  test('- update this user by id with right data types', async () => {
    const response = await request.put(`/api/users/${MOCK_ID}`).send(MOCK_UPDATE_RIGHT_USER);
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toEqual({ ...MOCK_UPDATE_RIGHT_USER, id: MOCK_ID });
  });
});
