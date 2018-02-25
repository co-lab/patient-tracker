// @flow
import supertest from 'supertest';
import knexCleaner from 'knex-cleaner';
import sinon from 'sinon';
import jsrsasign from 'jsrsasign';

import app from '../../src/app';
import knex from '../../src/models';

import * as authlib from '../../src/lib/auth';
import * as emaillib from '../../src/lib/email';

afterAll(() => knex.destroy());

describe('POST /signin - Endpoint to Sign-In users', () => {
  describe('when user posts an email address', () => {
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

    describe('@database', () => {
      let jsrsasignStub;
      let emaillibMock;

      beforeEach(async () => {
        await knexCleaner.clean(knex);
        emaillibMock = sinon.mock(emaillib);
        jsrsasignStub = sinon
          .stub(jsrsasign.jws.JWS, 'sign')
          .callsFake(() => 'TOKEN');
      });

      afterEach(() => {
        emaillibMock.restore();
        jsrsasignStub.restore();
      });

      it('should work if the user exists', async () => {
        // Given a user in the database
        const email = 'foo@blah.com';
        await knex('user').insert({ email });

        // And given that we set some expectations for the emaillib mock
        emaillibMock.expects('send').once().withArgs({
          to: 'foo@blah.com',
          template: 'login',
          vars: { link: 'http://localhost:8000/signin?token=TOKEN' },
        });

        // When a login attempt happens with that user
        const { statusCode } = await supertest(app).post('/signin').send({ email });

        // Then the response code should be 200
        expect(statusCode).toBe(200);

        // Then it should send the user an email
        emaillibMock.verify();
      });
    });
  });
});

describe('GET /signin?token=TOK - Endpoint to Sign-In users', () => {
  describe('when user posts a token', () => {
    it('should fail if token is invalid', async () => {
      // When user posts an invalid token to signin
      const { statusCode } = await supertest(app)
        .get('/signin?token=foo');

      // Then response status code should be 401
      expect(statusCode).toBe(401);
    });

    it('should return another token if the token is valid', async () => {
      // Given that we have a valid token
      const token = authlib.createJWT('uuid', 'foo@blah.com', '1hour');

      // When the valid token is posted to the signin url
      const response = await supertest(app).get(`/signin?token=${token}`);

      // Then the status code should represent success
      expect(response.statusCode).toBe(200);

      // And then there should be a token in the response
      expect(response.body.token).not.toBeUndefined();

      // Then the new token should be issued to the same user
      const newToken = authlib.parseJWT(response.body.token);
      expect(newToken.sub).toEqual('foo@blah.com');
    });
  });
});
