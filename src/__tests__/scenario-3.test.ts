import supertest from 'supertest';
import { StatusCodeEnum } from '../types';
import { createHttpServer } from '../server';
import { MESSAGES } from '../constants';

const server = createHttpServer();
const request = supertest(server);

const MOCK_ID = 'adfd01fb-309b-4e1c-9117-44d003f5d7fc';
const MOCK_ADD_USER = { username: 'John Mock', age: 35, hobbies: ['write tests', 'give up'] };

jest.mock('uuid', () => ({ v4: () => MOCK_ID, validate: () => true }));

describe('Scenario #3', () => {
  afterAll(() => server.close());

  test('- trying to get a user witch doesn`t exist', async () => {
    const response = await request.get(`/api/users/${MOCK_ID}`);
    expect(response.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
    expect(response.body).toEqual(JSON.parse(MESSAGES.USER_NOT_FOUND(MOCK_ID)));
  });
  test('- trying to add new user on wrong route', async () => {
    const result = await request.post(`/api/users/${MOCK_ID}`).send(MOCK_ADD_USER);
    expect(result.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
    expect(result.body).toEqual(JSON.parse(MESSAGES.WRONG_ROUTE));
  });
  test('- tring to delete a user witch doesn`t exist', async () => {
    const response = await request.delete(`/api/users/${MOCK_ID}`);
    expect(response.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
    expect(response.body).toEqual(JSON.parse(MESSAGES.USER_NOT_FOUND(MOCK_ID)));
  });
  test('- get users on the wrong route', async () => {
    const response = await request.get(`/api/users/${MOCK_ID}/test`);
    expect(response.statusCode).toBe(StatusCodeEnum.NOT_FOUND);
    expect(response.body).toEqual(JSON.parse(MESSAGES.WRONG_ROUTE));
  });
  test('- verify routes without / also working', async () => {
    const response = await request.get(`/api/users`);
    expect(response.statusCode).toBe(StatusCodeEnum.OK);
    expect(response.body).toBeInstanceOf(Array);
  });
});
