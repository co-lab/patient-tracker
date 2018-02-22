// @flow
import jsrsasign from 'jsrsasign';
import type { $Request } from 'express';
import type { UserType } from '../models/types';

import config from '../config';
import knex from '../models';
import { isEmail } from './validators';

export type JWTPayload = {
  sub: string,
  aud: string,
  nbf: number,
  iat: number,
  exp: number,
};

const TOKEN_ALGO = 'HS512';

export class AuthError extends Error {}

/** shortcut for the above class */
export const newError = (m: string): AuthError => new AuthError(m);

/** Creates new JWT tokens with user parameters in the payload
 *
 * @param {UserType} user that the token will be generated for.
 * @param {String} secret is the secret used to encrypt the
 *  token. Defaults to `config.auth.secret`.
 */
export function createJWT(user: UserType, expiration: number, secret: string = config.auth.secret): string {
  const now = jsrsasign.jws.IntDate.get('now');
  const header = JSON.stringify({ alg: TOKEN_ALGO, typ: 'JWT' });
  const payload = JSON.stringify({
    aud: user.id,
    sub: user.email,
    nbf: now,
    iat: now,
    exp: jsrsasign.jws.IntDate.get(`now + ${expiration}`),
  });
  return jsrsasign.jws.JWS.sign(TOKEN_ALGO, header, payload, { utf8: secret });
}

/** Parse JWT tokens and return the parsed JSON payload */
export function parseJWT(token: string, secret: string = config.auth.secret): JWTPayload {
  const encoded = token.split('.')[1];
  if (!encoded) {
    throw newError('Invalid Token');
  }
  if (!jsrsasign.jws.JWS.verify(token, { utf8: secret }, [TOKEN_ALGO])) {
    throw newError('Cannot verify token');
  } else {
    const buffer = Buffer.from(encoded, 'base64');
    return JSON.parse(buffer.toString('ascii'));
  }
}

/**  */
export async function welcomeOrSendEmail(tokenOrEmail: string): Promise<Object> {
  if (isEmail(tokenOrEmail)) {
    const [user] = await knex('user').where({ email: tokenOrEmail });
    if (user === undefined) throw newError('User does not exist');
    /* email.send('signin', createJWT(user)) */
    return { status: 'Email sent' };
  }
  return { status: 'ok', token: createJWT };
}


/** Just retrieve the `jwt` attribute set by checkAuth middleware
   without getting flow mad. */
export function jwtFromReq(req: $Request): JWTPayload {
  return ((req: any).jwt: JWTPayload);
}

/** Query the database with the user found in the JWT token */
export async function userFromReq(req: $Request): Promise<UserType> {
  const { aud, sub } = jwtFromReq(req);
  const [user] = await knex('user').where({ id: aud, email: sub });
  if (user === undefined) throw newError('User does not exist');
  return user;
}
