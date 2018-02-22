// @flow
import type { $Request } from 'express';
import { buildSchema } from 'graphql';

export const Schema = buildSchema(`
  type Query {
    ip: String
  }
`);

export const Root = {
  ip: (args: any, request: $Request) => request.ip,
};
