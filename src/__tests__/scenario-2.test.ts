import supertest from 'supertest';
import { NewUserType, StatusCodeEnum } from '../types';
import { createHttpServer } from '../server';
import { MESSAGES } from '../constants';

const server = createHttpServer();
const request = supertest(server);

const MOCK_ID = 'adfd01fb-309b-4e1c-9117-44d003f5d7fc';
const MOCK_ID_CHANGE = 'cbdcf48c-4b5d-4ebb-9156-988d35746e7e';
const MOCK_ADD_WRONG_USER = { username: 12, hobbies: ['have', 'fun'] };
const MOCK_ADD_USER_ID = { username: 'John Mock', age: 35, hobbies: ['write tests', 'give up'], id: MOCK_ID_CHANGE };
const MOCK_UPDATE_USER = { username: 'Mock', age: 28, hobbies: ['have', 'fun'], id: MOCK_ID_CHANGE };

jest.mock('uuid', () => ({ v4: () => MOCK_ID, validate: () => true }));

describe('Scenario #1', () => {
  afterAll(() => server.close());

  test('- trying to add new user without required fields (age)', async () => {
    const response = await request.post('/api/users/').send(MOCK_ADD_WRONG_USER);
    expect(response.statusCode).toBe(StatusCodeEnum.BAD_REQUEST);
    expect(response.body).toEqual(JSON.parse(MESSAGES.MISSED_FIELDS('age')));
  });
  test('- trying to add new user and add id field', async () => {
    const result = await request.post('/api/users/').send(MOCK_ADD_USER_ID);
    expect(result.statusCode).toBe(StatusCodeEnum.CREATED);
    expect(result.body).toEqual({ ...MOCK_ADD_USER_ID, id: MOCK_ID });
  });
  test('- update user and try to update id field', async () => {
    const response = await request.put(`/api/users/${MOCK_ID}`).send(MOCK_UPDATE_USER);
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toEqual({ ...MOCK_UPDATE_USER, id: MOCK_ID });
  });
  test('- find this user by id', async () => {
    const response = await request.get(`/api/users/${MOCK_ID}`);
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toEqual({ ...MOCK_UPDATE_USER, id: MOCK_ID });
  });
  test('- delete this user by id', async () => {
    const response = await request.delete(`/api/users/${MOCK_ID}`);
    expect(response.statusCode).toBe(StatusCodeEnum.NO_CONTENT);
  });
  test('- find this user by id again', async () => {
    const response = await request.get(`/api/users/${MOCK_ID}`);
    expect(response.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
    expect(response.body).toEqual(JSON.parse(MESSAGES.USER_NOT_FOUND(MOCK_ID)));
  });
});
