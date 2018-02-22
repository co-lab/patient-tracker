// @flow
import type { $Request, $Response } from 'express';
import * as auth from '../lib/auth';

export function checkAuth({ except }: { except: Array<string> }): Function {
  return (req: $Request, res: $Response, next: Function) => {
    if (except.indexOf(req.path) === -1) {
      // No authorization header leads to direct authorization failure
      if (req.headers && req.headers.authorization === undefined) {
        res.sendStatus(401);
        return;
      }
      const token = req.headers.authorization.substr('Bearer '.length);
      try {
        // Just tricking flow to accept assigning to `req` without
        // extending the $Request type with the `jwt` attribute
        (req: any).jwt = auth.parseJWT(token);
      } catch (error) {
        // Without parsing the token, the request can be considered
        // unauthorized.
        res.sendStatus(401);
        return;
      }
    }
    next();
  };
}
