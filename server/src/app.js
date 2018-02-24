// @flow
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';

import * as authControllers from './controllers/auth';
import config, { isEnv } from './config';
import { checkAuth } from './middleware/auth';
import { Schema, Root } from './graphql';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(checkAuth({ except: ['/signin'] }));
app.use(cors({ origin: config.site_url, optionsSuccessStatus: 200 }));
app.post('/signin', authControllers.signin);
app.get('/signin', authControllers.signin);
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: Root,
  graphiql: isEnv('development'),
}));

export default app;
