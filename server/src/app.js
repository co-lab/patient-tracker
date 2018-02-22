// @flow
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';

import * as authControllers from './controllers/auth';
import { isEnv } from './config';
import { checkAuth } from './middleware/auth';
import { Schema, Root } from './graphql';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(checkAuth({ except: ['/auth/signin'] }));
app.get('/auth/signin', authControllers.signin);
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: Root,
  graphiql: isEnv('dev'),
}));

export default app;
