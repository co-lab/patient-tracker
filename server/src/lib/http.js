// @flow
import { AuthError } from '../lib/auth';
import { ValidationError } from '../lib/validators';

/** Return the proper HTTP Error code based on the exception type */
export function handleError(error: Error): number {
  return error.code === 'ER_DUP_ENTRY' ? 409 : ({
    [AuthError.name]: 401,
    [ValidationError.name]: 400,
  })[error.constructor.name] || 500;
}
