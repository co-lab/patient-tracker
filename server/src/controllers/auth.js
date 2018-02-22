// @flow
import type { $Request, $Response } from 'express';
import { handleError } from '../lib/http';
import * as auth from '../lib/auth';

export async function signin(req: $Request, res: $Response): mixed {
  try {
    res.status(200).json(await auth.welcomeOrSendEmail(req.body));
  } catch (error) {
    res.sendStatus(handleError(error));
  }
}
