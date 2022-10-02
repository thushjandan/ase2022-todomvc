import * as db from '../db.js';

export async function addTagToTodoHandler(ctx) {
    const todoId = ctx.params.id;
    const tag = ctx.request.body;
    if (!tag.id) ctx.throw(400, {'error': '"id" is a required field'});
    const tagId = tag.id;
    if (!typeof tagId === 'number') ctx.throw(400, {'error': '"id" must be a number'});
  
    let result = await db.addTagToTodo(todoId, tagId);
    if (result == null) {
        ctx.throw(400, {'error': 'Todo id or Tag id cannot be found'});
    }
  
    ctx.status = 200;
    ctx.body = {}
  }