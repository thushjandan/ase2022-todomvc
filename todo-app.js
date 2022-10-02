import Router from 'koa-router';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import mongoose from "mongoose";
import dotenv from 'dotenv'


import { 
  listTodosHandler, 
  addTodoHandler, 
  clearTodoHandler, 
  removeTodoHandler, 
  updateTodoHandler, 
  showTodoHandler,
  addTagToTodoHandler,
  showTagsByTodoHandler,
  deleteAllTagsFromTodoHandler,
  removeTagFromTodoHandler
} from './src/controller/todos/index.js';
import { 
  listTagsHandler, 
  addTagHandler, 
  clearTagsHandler, 
  removeTagHandler, 
  updateTagHandler, 
  showTagHandler,
  showTodosByTagHandler
} from './src/controller/tags/index.js';

dotenv.config();
const app = new Koa();
const router = new Router();

router.get('/todos/', listTodosHandler)
  .del('/todos/', clearTodoHandler)
  .post('/todos/', addTodoHandler)
  .get('todo', '/todos/:id', showTodoHandler)
  .patch('/todos/:id', updateTodoHandler)
  .del('/todos/:id', removeTodoHandler)
  .get('/todos/:id/tags/', showTagsByTodoHandler)
  .post('/todos/:id/tags/', addTagToTodoHandler)
  .delete('/todos/:id/tags/', deleteAllTagsFromTodoHandler)
  .delete('/todos/:id/tags/:tag_id', removeTagFromTodoHandler)
  .get('/tags/', listTagsHandler)
  .del('/tags/', clearTagsHandler)
  .post('/tags/', addTagHandler)
  .get('tag', '/tags/:id', showTagHandler)
  .patch('/tags/:id', updateTagHandler)
  .del('/tags/:id', removeTagHandler)
  .get('/tags/:id/todos/', showTodosByTagHandler);

const start = async() => {
  app
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());
  try {
    await mongoose.connect(process.env.MONGODB_SERVER);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  app.listen(process.env.PORT || 8080);
}
// Start server
start();
