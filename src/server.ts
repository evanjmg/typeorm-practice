import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import bodyParser from 'body-parser';
import { read, create, readTodosIncomplete2 } from './services/todos.service';
import { readAuthors } from './services/author.service';
import { readCategories } from './services/categories.service';

createConnection().then(async (connection) => {
  const app = express();
  // support parsing of application/json type post data
  app.use(bodyParser.json());

  // support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/create', create);
  app.get('/authors', readAuthors);

  app.get('/readCategories', readCategories);
  app.get('/readIncomplete', readTodosIncomplete2);
  app.get('/read', read);
  app.listen(3000, () => console.log('ORM practice app listening on port 3000!'));
}).catch((error) => console.log(error));
