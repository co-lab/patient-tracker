// @flow
import supertest from 'supertest';
import app from '../../src/app';
import knex from '../../src/models';

afterAll(() => knex.destroy());

describe('POST /signin - Endpoint to Sign-In users', () => {
  it('should error if there is no data in the request', async () => {
    // When POST doesn't contain any data
    const { statusCode } = await supertest(app)
          .post('/signin')
          .send({});
    // Then it should yield BadRequest
    expect(statusCode).toBe(400);
  });

  it('should error if there is no user with the data', async () => {
    // When POST request hits the signin endpoint with an email of a
    // user that doesn't exist in the database
    const { statusCode } = await supertest(app)
          .post('/signin')
          .send({ email: 'whtevr@no.co' });

    // Then response status code should be 401
    expect(statusCode).toBe(401);
  });
});
