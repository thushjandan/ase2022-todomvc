import * as db from '../db.js';

export async function addTodoHandler(ctx) {
    const todo = ctx.request.body;
    if (!todo.title) ctx.throw(400, {'error': '"title" is a required field'});
    const title = todo.title;
    if (!typeof title === 'string' || !title.length) ctx.throw(400, {'error': '"title" must be a string with at least one character'});
  
    todo['completed'] = todo['completed'] || false;
    let docTodo = await db.createTodo(todo);
    todo['url'] = 'http://' + ctx.host + ctx.router.url('todo', docTodo.id);
  
    ctx.status = 303;
    ctx.set('Location', todo['url']);
  }